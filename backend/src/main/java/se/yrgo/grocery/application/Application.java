package se.yrgo.grocery.application;

import java.util.Collections;
import java.util.Set;

public abstract class Application
{
   private static final Set<Object> emptySet = Collections.emptySet();

   /**
    * Get a set of root resource and provider classes. The default lifecycle
    * for resource class instances is per-request. The default lifecycle for
    * providers is singleton.
    * <p/>
    * <p>Implementations should warn about and ignore classes that do not
    * conform to the requirements of root resource or provider classes.
    * Implementations should warn about and ignore classes for which
    * {@link #getSingletons()} returns an instance. Implementations MUST
    * NOT modify the returned set.</p>
    *
    * @return a set of root resource and provider classes. Returning null
    *         is equivalent to returning an empty set.
    */
   public abstract Set<Class<?>> getClasses();

   /**
    * Get a set of root resource and provider instances. Fields and properties
    * of returned instances are injected with their declared dependencies
    * (see {@link Context}) by the runtime prior to use.
    * <p/>
    * <p>Implementations should warn about and ignore classes that do not
    * conform to the requirements of root resource or provider classes.
    * Implementations should flag an error if the returned set includes
    * more than one instance of the same class. Implementations MUST
    * NOT modify the returned set.</p>
    * <p/>
    * <p>The default implementation returns an empty set.</p>
    *
    * @return a set of root resource and provider instances. Returning null
    *         is equivalent to returning an empty set.
    */
   public Set<Object> getSingletons()
   {
      return emptySet;
   }

}
