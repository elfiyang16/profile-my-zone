terraform {
  required_version = "~> 1.0"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~>3.0"
    }
  }

  #   backend "s3" {
  #     bucket = "elfi-y-terraform"
  #     key    = "prod/terraform.tfstate"
  #     region = "eu-west-1"
  #   }
}

# Note: A provider block without an alias 
# argument is the default configuration for that provider.
provider "aws" {
  region = "eu-west-1"
}

/*If you want to require HTTPS between viewers and CloudFront, 
you must change the AWS Region to US East (N. Virginia) 
in the AWS Certificate Manager console 
*/
provider "aws" {
  alias  = "acm_provider"
  region = "us-east-1"
}



