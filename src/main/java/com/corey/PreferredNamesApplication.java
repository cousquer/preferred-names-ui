package com.corey;

import org.apereo.portal.soffit.renderer.SoffitApplication;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SoffitApplication
@SpringBootApplication
public class PreferredNamesApplication {

	public static void main(String[] args) {
		SpringApplication.run(PreferredNamesApplication.class, args);
	}
}
