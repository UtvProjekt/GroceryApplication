package se.yrgo.grocery.app;

import javax.enterprise.context.ApplicationScoped;
import javax.ws.rs.core.Application;

import org.jboss.resteasy.plugins.interceptors.CorsFilter;

import se.yrgo.grocery.rest.GroceryResourceService;
import se.yrgo.grocery.rest.LoginResourceService;

import java.util.HashSet;
import java.util.Set;

@ApplicationScoped
public class ServiceApplication extends Application{
	/**
	 * Adding rest service class and cors to application.
	 * 
	 * Cors - Access to api
	 */
	private Set<Object> singletons = new HashSet<>();

    public ServiceApplication() {
    	CorsFilter corsfilter = new CorsFilter();
        corsfilter.getAllowedOrigins().add("*");
        corsfilter.setAllowedMethods("OPTIONS, GET, POST, PUT, DELETE, PATCH");
        singletons.add(corsfilter);
        singletons.add(GroceryResourceService.getInstance());
        singletons.add(LoginResourceService.getInstance());
    }

    @Override
    public Set<Object> getSingletons() {
        return singletons;
    }

    
}
