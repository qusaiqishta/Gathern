pipeline {
    agent any

    // Parameters for manual build input
    parameters {
        string(
            name: 'SPEC',
            defaultValue: 'cypress/e2e/**',
            description: 'Enter the script path to execute'
        )
        choice(
            name: 'BROWSER',
            choices: ['chrome', 'edge', 'firefox'],
            description: 'Select the browser to run Cypress tests'
        )
    }

    // Top-level options
    options {
        ansiColor('xterm')
    }

    // Stages must be top-level
    stages {

        stage('Build') {
            steps {
                echo "Building the application"
            }
        }

        stage('Testing') {
            steps {
                bat 'npm install'
                bat "npx cypress run --browser %BROWSER% --spec \"%SPEC%\""
            }
        }

        stage('Deploy') {
            steps {
                echo "Deploying the application"
            }
        }
    }

    // Post actions
    post {
        always {  
            publishHTML([
                allowMissing: true,
                alwaysLinkToLastBuild: true,
                keepAll: true,
                reportDir: 'cypress/report',
                reportFiles: 'index.html',
                reportName: 'HTML Report'
            ])
        }
    }
}
