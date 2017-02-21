@Library('common') import common
def commonLib = new common()

moduleName = 'nav-frontend-moduler'
moduleUrl = 'https://nav.no'
moduleChannel = 'natthauk-ops'
application = "nav-frontend-moduler"
releaseVersion = "${currentBuild.number}.0.0"
miljo = "16557"

def notifyFailed(reason, error) {
    changelog = commonLib.getChangeString()
    chatmsg = "**[${application} ${version}](https://modapp-t1.adeo.no/mia/) ${reason} **\n\n${changelog}"
    mattermostSend channel: 'natthauk-ops', color: '#FF0000', message: chatmsg
    currentBuild.result = 'FAILED'
    step([$class: 'StashNotifier'])
    throw error
}

node {
    commonLib.setupTools("Maven 3.3.3", "java8")

    stage('Checkout') {
        steps {
            git url: "ssh://git@stash.devillo.no:7999/navfront/${application}.git"
        }
    }

    stage('Install') {
        sh "npm run installAfterConfig"
    }

    stage('Lint') {
        sh "npm run lint"
    }

    stage('Test') {
        sh "npm test"
    }

    stage('Build') {
        sh "npm run build"
    }

    stage('Prepare publish') {
        sh "npm run CI:pre"
    }

    stage('Publish') {
        sh "npm run CI:publish"
    }

    stage('Dockerify') {
        script {
            GString imageName =  "docker.adeo.no:5000/${application}:${releaseVersion}"
            sh "mvn versions:set -f app-config/pom.xml -DgenerateBackupPoms=false -B -DnewVersion=${releaseVersion}"
            sh "git commit -am \"set version to ${releaseVersion} (from Jenkins pipeline)\""
            sh "git push origin master"
            sh "git tag -a ${application}-${releaseVersion} -m ${application}-${releaseVersion}"
            sh "git push --tags"
            sh "sudo docker build -t ${imageName} ."
            sh "sudo docker push ${imageName}"
            sh "mvn clean deploy -f app-config/pom.xml -DskipTests -B -e"
        }
    }
}

stage("Deploy app") {
    callback = "${env.BUILD_URL}input/Deploy/"
    node {
        def author = sh(returnStdout: true, script: 'git --no-pager show -s --format="%an <%ae>" HEAD').trim()
        def deploy = commonLib.deployApp(application, releaseVersion, miljo, callback, author).key

        try {
            timeout(time: 15, unit: 'MINUTES') {
                input id: 'deploy', message: "deployer ${deploy}, deploy OK?"
            }
        } catch(Exception e) {
            msg = "Deploy feilet [" + deploy + "](https://jira.adeo.no/browse/" + deploy + ")"
            notifyFailed(msg, e)
        }
    }
}

chatmsg = "**[${moduleName}](${moduleUrl}) Bygg OK**"
mattermostSend channel: moduleChannel, color: 'good', message: chatmsg