![](2021-06-20-09-55-06.png)
![](2021-06-20-09-55-38.png)

- ADD all 4 domains 
![](2021-06-20-09-55-55.png)
![](2021-06-20-09-56-18.png)

- TEST it by ping it
![](2021-06-20-09-56-58.png)


- REQUEST certificate
need both domain
![](2021-06-20-09-58-01.png)
auto create the record in route53
![](2021-06-20-09-59-03.png)
in cloudfront, add the CNAMES and select the SSL
![](2021-06-20-10-00-04.png)

- CHANGE s3 acl so people need to go through cloudfront to access it
change bucket policy to add a random string
![](2021-06-20-10-00-59.png)
in cloudfront change teh headers to include that random string as referer
![](2021-06-20-10-01-40.png)
