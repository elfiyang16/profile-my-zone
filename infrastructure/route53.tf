resource "aws_route53_zone" "main" {
  name = var.domain_name
  tags = var.common_tags
}

# This is a DNS record for the ACM certificate validation to prove we own the domain
# This example, we make an assumption that the certificate is for a single domain name so can just use the first value of the
# domain_validation_options.  It allows the terraform to apply without having to be targeted.
# This is somewhat less complex than the example at https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/acm_certificate_validation
# - that above example, won't apply without targeting

# resource "aws_route53_record" "cert_validation" {
#   depends_on = [aws_acm_certificate.ssl_certificate]

#   allow_overwrite = true
#   for_each = {
#     for dvo in aws_acm_certificate.ssl_certificate.domain_validation_options : dvo.domain_name => {
#       name   = dvo.resource_record_name
#       record = dvo.resource_record_value
#       type   = dvo.resource_record_type
#     }
#   }

#   name    = each.value.name
#   records = [each.value.record]
#   type    = each.value.type

#   #   name    = tolist(aws_acm_certificate.ssl_certificate.domain_validation_options)[0].resource_record_name
#   #   records = [tolist(aws_acm_certificate.ssl_certificate.domain_validation_options)[0].resource_record_value]
#   #   type    = tolist(aws_acm_certificate.ssl_certificate.domain_validation_options)[0].resource_record_type
#   zone_id = aws_route53_zone.main.id
#   ttl     = 300
# }

# To create a DNS record to validate the certificate request
# need 2 domains one for www, one for root
resource "aws_route53_record" "root-a" {
  zone_id = aws_route53_zone.main.zone_id
  name    = var.domain_name
  type    = "A"

  alias {
    name                   = aws_cloudfront_distribution.root_s3_distribution.domain_name
    zone_id                = aws_cloudfront_distribution.root_s3_distribution.hosted_zone_id
    evaluate_target_health = false
  }
}


resource "aws_route53_record" "www-a" {
  zone_id = aws_route53_zone.main.zone_id
  name    = "www.${var.domain_name}"
  type    = "A"

  alias {
    name                   = aws_cloudfront_distribution.www_s3_distribution.domain_name
    zone_id                = aws_cloudfront_distribution.www_s3_distribution.hosted_zone_id
    evaluate_target_health = false
  }
}
