package se.yrgo.grocery.dataaccess;

import java.util.List;

import javax.ejb.Stateless;
import javax.enterprise.inject.Default;
import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.EntityTransaction;
import javax.persistence.Persistence;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import com.fasterxml.jackson.core.JsonProcessingException;

import se.yrgo.grocery.domain.Grocery;
import se.yrgo.grocery.domain.Login;
import se.yrgo.grocery.exceptions.GroceryCouldNotBeAddedException;
import se.yrgo.grocery.exceptions.GroceryNotFoundException;
import se.yrgo.grocery.exceptions.UserNotFoundException;
import se.yrgo.grocery.solr.SolrService;

/**
 * Class that handles queries and communication with the database.
 */
@Default
@Stateless
public class DataAccessProductionVersion implements GroceryDataAccess, LoginDataAccess {

	@PersistenceContext
	private EntityManagerFactory emf = Persistence.createEntityManagerFactory("groceryDB");
	@PersistenceContext
	private EntityManager em = emf.createEntityManager();
	private EntityTransaction tx = em.getTransaction();
	private SolrService solrService = new SolrService();
	private static final Logger errorLogger = LogManager.getLogger("errorLogger");
	private static final Logger infoLogger = LogManager.getLogger("infoLogger");
	
	
	/**
	 * @return - returns all groceries from the database
	 */
	@SuppressWarnings("unchecked")
	public List<Grocery> findAll() {
		Query q = em.createQuery("select name from Grocery name");
		return q.getResultList();
	}

	/**
	 * @param gro - Adding a created grocery object to the database from the frontend.
	 * 
	 * Logs to src/main/resources/logfiles/information.log
	 */
	public void addGrocery(Grocery gro) {
		try {
			tx.begin();
			em.persist(gro);
			solrService.addNewGroceryItem(gro);
			solrService.reload();
			infoLogger.info("Successfully added a new grocery to database.");
			tx.commit();

		} catch (GroceryNotFoundException ex) {
			errorLogger.error("Grocery from call could not be found");
			tx.rollback();
		} catch (GroceryCouldNotBeAddedException ex) {
			errorLogger.error("Grocery could not be added:\nStacktrace: " + ex.getMessage() + "\n");
			tx.rollback();
		}

	}

	/**
	 * @param id - Deletes a Grocery object from the database
	 * 
	 * Logs to src/main/resources/logfiles/error.log
	 */
	@Override
	public void deleteGrocery(int id) {
		try {
			tx.begin();
			em.remove(findGroceryById(id));
			solrService.deleteGroceryItem(id);
			tx.commit();
		} catch (GroceryNotFoundException ex) {
			errorLogger.error("Grocery from call could not be found when trying to delete. (Executing rollback) " 
			+ "Stacktrace: " + ex.getMessage());
			tx.rollback();
		} catch (Exception ex) {
			tx.rollback();
		}

	}
	
	/**
	 * @param gro - Updates a grocery.
	 * 
	 * Logs to src/main/resources/logfiles/information.log
	 * or if error towards error.log
	 */

	public void updateGrocery(Grocery gro) {

		try {
			tx.begin();
			em.merge(gro);
			infoLogger.info("Successfully updated a grocery.");
			tx.commit();
		} catch (GroceryNotFoundException ex) {
			errorLogger.error("Grocery from call could not be found when trying to update. (Executing rollback) "
			+ "Stacktrace: " + ex.getMessage());
			tx.rollback();
		}

	}

	/**
	 * @param id - id finds object from database with query.
	 * @return - returns a single Grocery by id
	 */
	@Override
	public Grocery findGroceryById(long id) {
		Query q = em.createQuery("select grocery from Grocery grocery where grocery.id = :id");
		q.setParameter("id", id);
		return (Grocery) q.getSingleResult();
	}

	/**
	 * @param credentials - comes from frontend webapp to store in database
	 * 
	 * addUser stores a new user in table Login
	 */
	@Override
	public void addUser(Login credentials) {
		try {
			tx.begin();
			em.persist(credentials);
			tx.commit();
		} catch (UserNotFoundException ex) {
			errorLogger.error("User from call could not be found when trying to add. (Executing rollback) "
			+ "Stacktrace: " + ex.getMessage());
			tx.rollback();
		}
	}

	/**
	 * @param email - finds a user (Login) object by their email
	 */
	@Override
	public Login findUserByEmail(String email) {
		Query q = em.createQuery("select login from Login login where login.email = :email");
		q.setParameter("email", email);
		return (Login) q.getSingleResult();

	}

	/**
	 * Selects all users from Login table
	 */
	@SuppressWarnings("unchecked")
	@Override
	public List<Login> findAllUsers() {
		Query q = em.createQuery("select email from Login email");
		return q.getResultList();
	}

	/**
	 * @return - returns the encrypted password of a user my their email
	 */
	@Override
	public String getPasswordByEmail(String email) {
		Query q = em.createQuery("select password.password from Login password where password.email = :email")
				.setParameter("email", email);
		return (String) q.getSingleResult();
	}

	/**
	 * @return - returns true or false depending whether the user is an admin or not.
	 */
	@Override
	public boolean checkIfAdmin(String email) {
		Login adminCheck = findUserByEmail(email);
		if (adminCheck.isAdmin() == 1) {
			return true;
		} else {
			return false;
		}

	}
	
	/**
	 * @param search - searched item
	 * @param rows - how many returned items there should be
	 * 
	 * Solr search for groceries. 
	 */
	@Override
	public String searchForGroceries(String search, int rows) {
		return solrService.get(search, rows);
	}

	/**
	 * @param filter - filters the search or all objects in frontend
	 * 
	 * @return - returns a list of all filtered items
	 */
	@SuppressWarnings("unchecked")
	public List<Grocery> searchWithFilter(String filter) {
		Query q = em.createQuery("select grocery from Grocery grocery where grocery.category = :filter");
		q.setParameter("filter", filter);
		return q.getResultList();
	}

}