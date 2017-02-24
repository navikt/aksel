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

node('master') {
    commonLib.setupTools("Maven 3.3.3", "java8")
    env.PATH="/usr/bin:${env.PATH}"

    stage('Checkout') {
        git url: "ssh://git@stash.devillo.no:7999/navfront/${application}.git"
        sh "git pull origin ${branch}"
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
        sh "mvn versions:set -f app-config/pom.xml -DgenerateBackupPoms=false -B -DnewVersion=${releaseVersion}"
        sh "git add app-config/pom.xml"
    }

    stage('Publish modules') {
        sh "npm run CI:publish"
        sh "npm run CI:npmpublish"
    }

    stage('Build storybook') {
        sh "npm run buildstorybook"
    }

    stage('Dockerify') {
        script {
            GString imageName =  "docker.adeo.no:5000/${application}:${releaseVersion}"
            sh "git tag -a ${application}@${releaseVersion} -m ${application}@${releaseVersion}"
            sh "git push origin master"
            sh "git push --tags"
//            sh "docker build -t ${imageName} ."
//            sh "docker push ${imageName}"
            sh "mvn clean deploy -f app-config/pom.xml -DskipTests -B -e"
        }
    }
}

//stage("Deploy app") {
//    callback = "${env.BUILD_URL}input/Deploy/"
//    node {
//        def author = sh(returnStdout: true, script: 'git --no-pager show -s --format="%an <%ae>" HEAD').trim()
//        def deploy = commonLib.deployApp(application, releaseVersion, miljo, callback, author).key
//
//        try {
//            timeout(time: 15, unit: 'MINUTES') {
//                input id: 'deploy', message: "deployer ${deploy}, deploy OK?"
//            }
//        } catch(Exception e) {
//            msg = "Deploy feilet [" + deploy + "](https://jira.adeo.no/browse/" + deploy + ")"
//            notifyFailed(msg, e)
//        }
//    }
//}

chatmsg = "**[${moduleName}](${moduleUrl}) Bygg OK**"
mattermostSend channel: moduleChannel, color: 'good', message: chatmsg