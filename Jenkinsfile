@Library('common') import common
def commonLib = new common()

moduleName = 'nav-frontend-moduler'
moduleUrl = 'https://nav.no'
moduleChannel = 'natthauk-ops'
application = "nav-frontend-moduler"
releaseVersion = "Unknown"
isMasterBuild = (env.BRANCH_NAME == 'master');

def notifyFailed(reason, error) {
    changelog = commonLib.getChangeString()
    chatmsg = "**[${application} ${version}](https://modapp-t1.adeo.no/mia/) ${reason} **\n\n${changelog}"
    mattermostSend channel: 'natthauk-ops', color: '#FF0000', message: chatmsg
    currentBuild.result = 'FAILED'
    step([$class: 'StashNotifier'])
    throw error
}
def returnOk(message) {
    echo "${message}"
    currentBuild.result = "SUCCESS"
    step([$class: 'StashNotifier'])
}

node('master') {
    commonLib.setupTools("Maven 3.3.3", "java8")

    stage('Checkout') {
        checkout scm
        step([$class: 'StashNotifier'])

        pom = readMavenPom file: 'app-config/pom.xml'
        releaseVersion = "${pom.version}.${currentBuild.number}"
    }

    if (!isMasterBuild) {
        stage('Merge master') {
            sh "git merge origin/master"
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

    if (!isMasterBuild) {
        sh "npm run CI:lerna:publishAlpha"
        sh "npm run CI:npm:prepublish"
        sh "npm run CI:npm:publish"
        returnOk("This is enough for now. I'm not releasing anything before it is on the master-branch....")
        return
    }

    hasPublished = true
    stage('Publish modules') {
        try {
            sh "npm run CI:lerna:publish"
            sh "npm run CI:npm:prepublish"
            sh "npm run CI:npm:publish"
            sh "mvn versions:set -f app-config/pom.xml -DgenerateBackupPoms=false -B -DnewVersion=${releaseVersion}"
        } catch (ignored) {
            hasPublished = false
        }
    }

    if (!hasPublished) {
        returnOk("No need to continue as no modules were published...")
        return
    }

    stage('Build storybook') {
        sh "npm run buildstorybook"
    }

    stage('Dockerify') {
        script {
            GString imageName =  "docker.adeo.no:5000/${application}:${releaseVersion}"
//            sh "git tag -a ${application}@${releaseVersion} -m ${application}@${releaseVersion}"
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

node {
    currentBuild.result = 'SUCCESS'
    step([$class: 'StashNotifier'])
}