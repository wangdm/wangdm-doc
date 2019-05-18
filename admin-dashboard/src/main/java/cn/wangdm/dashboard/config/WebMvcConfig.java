package cn.wangdm.dashboard.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebMvcConfig implements WebMvcConfigurer {

	@Override
	public void addViewControllers(ViewControllerRegistry registry) {
		
		registry.addViewController("/index").setViewName("index");
		registry.addViewController("/home").setViewName("home");
		registry.addViewController("/login").setViewName("login");
		registry.addViewController("/logout").setViewName("logout");
		
		registry.addViewController("/app/list").setViewName("app/list");	
		registry.addViewController("/app/verify").setViewName("app/verify");
		registry.addViewController("/app/delete").setViewName("app/delete");
		registry.addViewController("/dev/device").setViewName("dev/device");
		registry.addViewController("/dev/product").setViewName("dev/product");
		registry.addViewController("/dev/firmware").setViewName("dev/firmware");
		registry.addViewController("/account/list").setViewName("account/list");
		registry.addViewController("/account/verify").setViewName("account/verify");
		registry.addViewController("/account/delete").setViewName("account/delete");
		registry.addViewController("/account/login").setViewName("account/login");
		registry.addViewController("/user/user").setViewName("user/user");
		registry.addViewController("/user/role").setViewName("user/role");
		registry.addViewController("/system/log/login").setViewName("system/log/login");
		registry.addViewController("/system/log/operate").setViewName("system/log/operate");
		registry.addViewController("/system/log/visit").setViewName("system/log/visit");
		registry.addViewController("/system/dict").setViewName("system/dict");
		registry.addViewController("/system/nav").setViewName("system/nav");
	}
	
}
