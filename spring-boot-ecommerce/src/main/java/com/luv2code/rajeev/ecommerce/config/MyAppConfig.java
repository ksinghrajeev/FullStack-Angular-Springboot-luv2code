package com.luv2code.rajeev.ecommerce.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class MyAppConfig implements WebMvcConfigurer {

    @Value("{spring.mvc.servlet.basePath}")
    private String basePath;

    @Value("${allowed.origins}")
    private String[]  theAllowedOrigins;

    @Override
    public void addCorsMappings(CorsRegistry corsRegistry) {
        // configure cors mapping
        corsRegistry.addMapping("/api/**").allowedOrigins(theAllowedOrigins);
    }
}
