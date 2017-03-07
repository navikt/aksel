#!groovy
@Library('common')
import common

def common = new common()

moduleUrl = 'http://cisbl.devillo.no:8000'
moduleChannel = 'natthauk-ops'
application = "nav-frontend-moduler"
releaseVersion = "Unknown"
isMasterBuild = (env.BRANCH_NAME == 'master')
lastcommit = "Unknown"
committerEmail = "Unknown"

def notifyFailed(reason, error) {
    chatmsg = "**[${application} ${releaseVersion}](${moduleUrl}) ${reason} **\n\n${lastcommit} (${committerEmail})"
    mattermostSend channel: moduleChannel, color: 'danger', message: chatmsg
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
    common.setupTools("Maven 3.3.3", "java8")

    stage('Checkout') {
        checkout scm
        step([$class: 'StashNotifier'])
        committerEmail = sh(script: 'git log -1 --pretty=format:"%ae"', returnStdout: true).trim()
        lastcommit = sh(script: 'git log -1 --pretty=format:"%ae (%an) %h %s" --no-merges', returnStdout: true).trim()

        pom = readMavenPom file: 'app-config/pom.xml'
        releaseVersion = "${pom.version}.${currentBuild.number}"
    }

    if (!isMasterBuild) {
        stage('Merge master') {
            sh "git merge origin/master"
        }
    }

    stage('Install') {
        try {
            sh "npm run installAfterConfig"
        } catch(Exception e) {
            notifyFailed("Bygg feilet ved npm-install", e)
        }
    }

    stage('Lint') {
        try {
            sh "npm run lint"
        } catch(Exception e) {
            notifyFailed("Linting feilet", e)
        }
    }

    stage('Test') {
        try {
            sh "npm run checkversions"
        } catch(Exception e) {
            notifyFailed("Versjonssjekker feilet", e)
        }
        try {
            sh "npm test"
        } catch(Exception e) {
            notifyFailed("Tester feilet", e)
        }
    }

    stage('Build') {
        try {
            sh "npm run build"
        } catch(Exception e) {
            notifyFailed("Bygging av JS feilet", e)
        }
    }

    if (!isMasterBuild) {
        returnOk("This is enough for now. I'm not releasing anything before it is on the master-branch....")
        return
    }

    hasPublished = true
    stage('Publish modules') {
        try {
            sh "npm run CI:lerna:publish"
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
        try {
            sh "npm run buildstorybook"
        } catch(Exception e) {
            notifyFailed("Bygging av storybook feilet", e)
        }
    }

    stage('Dockerify') {
        script {
            try {
                GString imageName =  "docker.adeo.no:5000/${application}:${releaseVersion}"
                sh "git push origin master"
                sh "git push --tags"
    //            sh "docker build -t ${imageName} ."
    //            sh "docker push ${imageName}"
                sh "mvn clean deploy -f app-config/pom.xml -DskipTests -B -e"
            } catch(Exception e) {
                notifyFailed("Pushing til git og dockerify", e)
            }
        }
    }
}

//stage("Deploy app") {
//    callback = "${env.BUILD_URL}input/Deploy/"
//    node {
//        def author = sh(returnStdout: true, script: 'git --no-pager show -s --format="%an <%ae>" HEAD').trim()
//        def deploy = common.deployApp(application, releaseVersion, miljo, callback, author).key
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

chatmsg = "**[${application}](${moduleUrl}) Bygg OK**\n\n${lastcommit} (${committerEmail}"
mattermostSend channel: moduleChannel, color: 'good', message: chatmsg

node {
    returnOk('All good')
}