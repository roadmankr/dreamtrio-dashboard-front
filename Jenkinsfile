pipeline {
    agent any
    stages {
        stage('Start') {
            steps {
                slackSend (
                    color: '#FFFF00',
                    message: "START: '${env.JOB_NAME} [${env.BUILD_NUMBER}]' (${env.BUILD_URL})")
            }
            post {
                failure {
                    slackSend (color: '#FF0000', message: "FAILED: Start '${env.JOB_NAME} [${env.BUILD_NUMBER}]' (${env.BUILD_URL})")
                }
            }
        }
        stage('Checkout') {
            steps {
                checkout scm
            }
            post {
                failure {
                    slackSend (
                        color: '#FF0000',
                        message: "FAILED: Git checkout '${env.JOB_NAME} [${env.BUILD_NUMBER}]' (${env.BUILD_URL})")
                }
            }
        }
        stage("Set Variable") {
            steps {
                script {
                    // Git Commit 계정
                    GIT_COMMIT_AUTHOR = sh(script: "git --no-pager show -s --format=%an ${env.GIT_COMMIT}", returnStdout: true).trim();
                    // Git Commit 메시지
                    GIT_COMMIT_MESSAGE = sh(script: "git --no-pager show -s --format=%B ${env.GIT_COMMIT}", returnStdout: true).trim();

                    echo "Commit Author: ${GIT_COMMIT_AUTHOR}"
                    echo "Commit Message: ${GIT_COMMIT_MESSAGE}"
                }
            }
            post {
                success {
                    slackSend (
                        color: '#00FF00',
                        message: "CHECKOUT: ${GIT_COMMIT_AUTHOR} :: ${GIT_COMMIT_MESSAGE}")
                }
                failure {
                    slackSend (color: '#FF0000', message: "FAILED: Set Variable '${env.JOB_NAME} [${env.BUILD_NUMBER}]' (${env.BUILD_URL})")
                }
            }
        }
        stage('Deploy') {
             steps {
                 sshagent(credentials: ['AWS_KEY_DREAMTRIO']) {
                     sh '''
                         ssh -o StrictHostKeyChecking=no ec2-user@52.79.100.248 uptime
                         ssh -tt ec2-user@52.79.100.248 "pm2 stop dreamtrio-dashboard-front-prod"
                         ssh -tt ec2-user@52.79.100.248 "cd dreamtrio-dashboard-front && git pull origin main"
                         ssh -tt ec2-user@52.79.100.248 "cd dreamtrio-dashboard-front && pnpm install"
                         ssh -tt ec2-user@52.79.100.248 "cd dreamtrio-dashboard-front && pnpm run build"
                         ssh -tt ec2-user@52.79.100.248 "pm2 restart dreamtrio-dashboard-front-prod"
                     '''
                 }
             }
             post {
                 success {
                     slackSend (
                         color: '#00FF00',
                         message: "SUCCESS: Deploy '${env.JOB_NAME} [${env.BUILD_NUMBER}]' (${env.BUILD_URL})")
                 }
                 failure {
                     slackSend (
                         color: '#FF0000',
                         message: "FAILED: Deploy '${env.JOB_NAME} [${env.BUILD_NUMBER}]' (${env.BUILD_URL})")
                 }
             }
         }
    }
}