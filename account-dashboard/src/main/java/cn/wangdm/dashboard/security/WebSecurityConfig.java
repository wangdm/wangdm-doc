package cn.wangdm.dashboard.security;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.security.web.access.AccessDeniedHandler;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.security.web.authentication.logout.LogoutSuccessHandler;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

	private static Logger log = LoggerFactory.getLogger(WebSecurityConfig.class);
	
	@Autowired
	UserDetailsService customUserDetailsService;
	
	@Autowired
	PasswordEncoder customPasswordEncoder;
	
	@Autowired
	AuthenticationSuccessHandler successHandler;
	
	@Autowired
	AuthenticationFailureHandler failHandler;

	@Autowired
	LogoutSuccessHandler logoutHandler;
	
	@Autowired
	AccessDeniedHandler denyHandler;

	@Autowired
	AuthenticationEntryPoint authorizeEntryPoint;

	@Override
	protected AuthenticationManager authenticationManager() throws Exception {
		log.debug("authenticationManager");
		return super.authenticationManager();
	}

	@Bean
	@Override
	protected UserDetailsService userDetailsService() {
		log.debug("userDetailsService");
		return customUserDetailsService;
	}

	@Override
	protected void configure(AuthenticationManagerBuilder auth) throws Exception {
		log.debug("configure(AuthenticationManagerBuilder auth)");
		auth.userDetailsService(customUserDetailsService).passwordEncoder(customPasswordEncoder);
	}

	@Override
	public void configure(WebSecurity web) throws Exception {
		log.debug("configure(WebSecurity web)");
		super.configure(web);
	}

	@Override
	protected void configure(HttpSecurity http) throws Exception {
		log.debug("configure(HttpSecurity http)");
		http
		.exceptionHandling()
			.accessDeniedHandler(denyHandler)
			.authenticationEntryPoint(authorizeEntryPoint)
			.and()
		.headers()
			.frameOptions().disable()
			.and()
		.authorizeRequests()
			.antMatchers("/assets/**").permitAll()
			.antMatchers("/open/**").permitAll()
			.antMatchers("/weixin/**").permitAll()
			.antMatchers("/api/account/register/**").permitAll()
			.antMatchers("/api/account/captche/**").permitAll()
			.antMatchers("/api/account/checkphone/**").permitAll()
			.antMatchers("/api/account/checkemail/**").permitAll()
			.antMatchers("/register/**").permitAll()
			.antMatchers("/test/**").permitAll()
			.antMatchers("/visit").permitAll()
			.anyRequest().authenticated()
			.and()
		.formLogin()
			.loginPage("/login").permitAll()
			.successHandler(successHandler)
			.failureHandler(failHandler)
			.and()
		.logout()
			.logoutSuccessHandler(logoutHandler)
			.and()
		.csrf().disable();
		super.configure(http);
	}
	
}
