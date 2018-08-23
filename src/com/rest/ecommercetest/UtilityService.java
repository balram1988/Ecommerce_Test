package com.rest.ecommercetest;

import java.io.FileReader;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;

@Path("/utitlityservice")
public class UtilityService {
	
	static String preLoadedProduct;
	
	static {
		try {
			JSONParser parser = new JSONParser();
			System.out.println("Reading JSON file from Java program");
			/* Read file properties file */
			FileReader fileReader = new FileReader("H:/MyWorkspace/EcommerceTest/src/com/rest/ecommercetest/index.json");
			JSONObject json = (JSONObject) parser.parse(fileReader);
			preLoadedProduct = json.toJSONString();
		} catch (Exception ex) {
			ex.printStackTrace();
		}
	}

	@GET
	@Path("/getproducts")
	@Produces(MediaType.TEXT_HTML)
	public String getAllProducts() {
		return preLoadedProduct;
	}
}
