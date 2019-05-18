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
		registry.addViewController("/register").setViewName("register");
		
		registry.addViewController("/app").setViewName("app");
		registry.addViewController("/device").setViewName("device");
		registry.addViewController("/device/face-record").setViewName("device/face-record");
		registry.addViewController("/device/face-config").setViewName("device/face-config");
		registry.addViewController("/device/plate").setViewName("device/plate");
		registry.addViewController("/device/ipc").setViewName("device/ipc");
		registry.addViewController("/group").setViewName("group");
		registry.addViewController("/product").setViewName("product");
		registry.addViewController("/product-info").setViewName("product-info");
		registry.addViewController("/firmware").setViewName("firmware");
		registry.addViewController("/statistics/distribute").setViewName("statistics/distribute");
		registry.addViewController("/statistics/curve").setViewName("statistics/curve");
		registry.addViewController("/setting").setViewName("setting");
	}
	
}
