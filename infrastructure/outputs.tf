output "secret" {
  description = "The secret key for the deployment IAM user"
  value       = aws_iam_access_key.deployment_key.encrypted_secret
}
