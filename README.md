# Ecommerce_Test

Required : Java 1.7, ExtJs Library, Sencha SDK 5.1.3 & ruby installer
Checkout the project as new Web Project for git:
Add tomcat server to it and run with it.
use the url http://localhost:9090/EcommerceTest/ to use it.

Implementation : 

Create one rest resource with the name of utitlityservice using rest web api.
this api have the method to all the product detail from json file. 
Rest URL : http://localhost:9090/EcommerceTest/rest/utitlityservice/getproducts?_dc=1535000219891

chnage the below path utitlityservice.java accordingly your path for index.json file.
***** H:/MyWorkspace/EcommerceTest/src/com/rest/ecommercetest/index.json ****

For the GUI I have used Extjs. for which two above installer sencha sdk and ruby must be install 
to create project from scratch. after installation you need to run the command in web app to support extjs dev environment.
use command - sencha -sdk path/extjs-lib generate appName path/your-web-app-directory.
Now it will setup everything for you. and we have to start from main.js file which is responsible for ui part.

once the server is up you can see the list of all product on home page with category.
now you can click on any item and it will display detail page of it. now you can add it to cart 
on top right corner it will display no. of items you added in to cart.






