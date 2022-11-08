package com.dorecipe.main;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
import org.springframework.context.annotation.ComponentScan;

//@ComponentScan({"com.dorecipe.main.security.secure"})
@SpringBootApplication
//@SpringBootApplication(exclude = DataSourceAutoConfiguration.class) 
public class DorecipeMybatisApplication {

	public static void main(String[] args) {
		SpringApplication.run(DorecipeMybatisApplication.class, args);
	}

}
