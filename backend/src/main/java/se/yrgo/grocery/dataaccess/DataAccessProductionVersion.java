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

import com.fasterxml.jackson.core.JsonProcessingException;

import se.yrgo.grocery.domain.Grocery;
import se.yrgo.grocery.domain.Login;

/**
 * Class that handles queries and communication with the database.
 */
@Default
@Stateless
public class DataAccessProductionVersion implements DataAccess, LoginDataAccess {

	@PersistenceContext
	private EntityManagerFactory emf = Persistence.createEntityManagerFactory("groceryDB");
	@PersistenceContext
	private EntityManager em = emf.createEntityManager();

	private EntityTransaction tx = em.getTransaction();

	/**
	 * @return - returns all groceries from the database
	 */
	@SuppressWarnings("unchecked")
	public List<Grocery> findAll() {
		Query q = em.createQuery("select name from Grocery name");
		return q.getResultList();
	}

	/**
	 * @param gro - Grocery object Adding a Grocery to the database
	 * @throws JsonProcessingException
	 */
	public void addGrocery(Grocery gro) {
		/*
		tx.begin();
		Grocery persistError = new Grocery(gro.getName(), gro.getPrice(), gro.getDescription(), gro.getExpiredDate(),
				gro.getStockOf(), gro.getBrand(), gro.getImageUrl());
		em.persist(persistError);
		tx.commit();
		 */
		
		try {
			tx.begin(); 
			Grocery persistError = new Grocery(gro.getName(), gro.getPrice(), gro.getDescription(), gro.getExpiredDate(),
					gro.getStockOf(), gro.getBrand(), gro.getImageUrl());
			em.persist(persistError);	
			tx.commit();
		}
		catch(Exception ex) {
			tx.rollback();
		}

	}

	/**
	 * @param id - generatedKey Deletes a Grocery from the database
	 */
	@Override
	public void deleteGrocery(int id) {
		/*tx.begin();
		
		Query q = em.createQuery("delete from Grocery where Id = :id");
		q.setParameter("id", id);
		q.executeUpdate();
		*/
		try {
			tx.begin(); 
			em.remove(findGroceryById(id));			
			tx.commit();
		}
		catch(Exception ex) {
			tx.rollback();
		}

		/*if (q.executeUpdate() != 0) {
			tx.commit();
		} else {
			tx.rollback();
		}*/

	}

	public void updateGrocery(Grocery gro) {
		/*
		tx.begin();

		Grocery grocery = findGroceryById(gro.getId());
		grocery.setName(gro.getName());
		grocery.setPrice(gro.getPrice());
		grocery.setDescription(gro.getDescription());
		grocery.setExpiredDate(gro.getExpiredDate());
		grocery.setStockOf(gro.getStockOf());
		grocery.setBrand(gro.getBrand());
		grocery.setImageUrl(gro.getImageUrl());

		tx.commit();
		 */
		try {
			tx.begin(); 
			em.merge(gro);			
			tx.commit();
		}
		catch(Exception ex) {
			tx.rollback();
		}
		

	}

	/**
	 * @param id - generatedKey
	 * @return - returns a single Grocery by id
	 */
	@Override
	public Grocery findGroceryById(long id) {
		Query q = em.createQuery("select grocery from Grocery grocery where grocery.id = :id");
		q.setParameter("id", id);
		return (Grocery) q.getSingleResult();
	}

	@Override
	public void addUser(Login credentials) {
		/*
		tx.begin();
		Login persistUser = new Login(credentials.getEmail(), credentials.getPassword(), credentials.getFirstname(), credentials.getSurname());
		em.persist(persistUser);
		tx.commit();
		 */
		
		try {
			tx.begin(); 
			Login persistUser = new Login(credentials.getEmail(), credentials.getPassword(), credentials.getFirstname(), credentials.getSurname());
			em.persist(persistUser);
			tx.commit();
		}
		catch(Exception ex) {
			tx.rollback();
		}
	}

	@Override
	public Login findUserByEmail(String email) {
		Query q = em.createQuery("select login from Login login where login.email = :email");
		q.setParameter("email", email);
		return (Login) q.getSingleResult();

	}

	@Override
	public List<Login> findAllUsers() {
		Query q = em.createQuery("select email from Login email");
		return q.getResultList();
	}

	@Override
	public String getPasswordByEmail(String email) {
		Query q = em.createQuery("select password.password from Login password where password.email = :email");
		q.setParameter("email", email);
		return (String) q.getSingleResult();
	}

}