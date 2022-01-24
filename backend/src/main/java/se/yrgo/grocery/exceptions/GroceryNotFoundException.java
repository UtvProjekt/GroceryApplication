package se.yrgo.grocery.exceptions;

import javax.ws.rs.NotFoundException;

public class GroceryNotFoundException extends NotFoundException{

	/**
	 * If grocery could not be found.
	 *
	 *	@extends NotFoundExcpetion - This exception is caught and will issue a rollback
	 */
	private static final long serialVersionUID = -3389461834287353327L;
	
}
