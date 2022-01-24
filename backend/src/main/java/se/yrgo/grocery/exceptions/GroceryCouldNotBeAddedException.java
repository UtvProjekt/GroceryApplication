package se.yrgo.grocery.exceptions;

import javax.persistence.RollbackException;
/**
 * 
 * @author Anton
 *
 *	If grocery could not be added.
 *
 *	@extends RollBackException - This exception is caught and will issue a rollback
 */
public class GroceryCouldNotBeAddedException extends RollbackException{

	/**
	 * 
	 */
	private static final long serialVersionUID = 8843789145001006152L;

}
