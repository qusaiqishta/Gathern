pipeline {
    agent any

    parameters {
        string(
            name: 'SPEC',
            defaultValue: 'cypress/e2e/**',
            description: 'Enter the spec path to execute'
        )
        choice(
            name: 'BROWSER',
            choices: ['chrome', 'edge', 'firefox'],
            description: 'Select the browser to run Cypress tests'
        )
    }

    stages {

        stage('Build') {
            steps {
                echo "Building the application"
            }
        }

        stage('Testing') {
            steps {
                bat 'npm install'
                bat "npx cypress run --browser ${params.BROWSER} --spec \"${params.SPEC}\""
            }
        }

        stage('Deploy') {
            steps {
                echo "Deploying the application"
            }
        }
    }

    post {
        always {  
            publishHTML([
                allowMissing: true,
                alwaysLinkToLastBuild: true,
                keepAll: true,
                reportDir: 'cypress/report',
                reportFiles: 'index.html',
                reportName: 'Cypress HTML Report'
            ])
        }
    }
}
