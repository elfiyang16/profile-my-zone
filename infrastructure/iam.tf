# another way of using template file with rendered
data "template_file" "static_website_deployment_document" {
  template = file("policies/deployment.json")

  vars = {
    cf_arn = aws_cloudfront_distribution.www_s3_distribution.arn
    s3_arn = aws_s3_bucket.www_bucket.arn
  }
}

resource "aws_iam_policy" "static_website_deployment_policy" {
  name        = "static-website-deployment-policy"
  description = "Deploys Gatsby site to AWS S3 and CloudFront"
  policy      = data.template_file.static_website_deployment_document.rendered
}

resource "aws_iam_user" "static-website-deployment-user" {
  name = "static-website-deployment-user"
}

resource "aws_iam_user_policy_attachment" "attach_deployment_policy" {
  user       = aws_iam_user.static-website-deployment-user.name
  policy_arn = aws_iam_policy.static_website_deployment_policy.arn
}

resource "aws_iam_access_key" "deployment_key" {
  user = aws_iam_user.static-website-deployment-user.name
}
