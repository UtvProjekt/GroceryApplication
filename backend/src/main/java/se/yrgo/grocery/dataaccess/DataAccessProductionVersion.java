package se.yrgo.grocery.dataaccess;

import java.util.List;

import javax.enterprise.inject.Default;
import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.EntityTransaction;
import javax.persistence.Persistence;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

import com.fasterxml.jackson.core.JsonProcessingException;

import se.yrgo.grocery.domain.Grocery;

/**
 * Class that handles queries and communication with the database.
 */
@Default
public class DataAccessProductionVersion implements DataAccess{

	@PersistenceContext
	private EntityManagerFactory emf = Persistence.createEntityManagerFactory("errorDB");
	@PersistenceContext
	private EntityManager em = emf.createEntityManager();
	
	private EntityTransaction tx = em.getTransaction();


	/**
	 * @return - returns all groceries from the database
	 */
		@SuppressWarnings("unchecked")
		public List<Grocery> findAll(){
			Query q = em.createQuery("select error from ErrorMessages error");
			return q.getResultList();
		}

		/**
		 * @param gro - Grocery object
		 * Adding a Grocery to the database
		 * @throws JsonProcessingException 
		 */
		public void addGrocery(Grocery gro){
			tx.begin();
			Grocery persistError = new Grocery();
			em.persist(persistError);
			tx.commit();
			
		}

		/**
		 * @param id - generatedKey
		 * Deletes a Grocery from the database
		 */
		@Override
		public void deleteGrocery(int id) {
			tx.begin();
			Query q = em.createQuery("delete from ErrorMessages where Id = :id");
			q.setParameter("id", id);
			q.executeUpdate();
			tx.commit();
				
		}
		
		public void updateGrocery(Grocery gro) {
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
	
		}
		
		
		/**
		 * @param id - generatedKey
		 * @return - returns a single Grocery by id
		 */
		@Override
		public Grocery findGroceryById(long id) {
			Query q = em.createQuery("select error from ErrorMessages error where error.id = :id");
			q.setParameter("id", id);
			return (Grocery) q.getSingleResult();
		}


	}