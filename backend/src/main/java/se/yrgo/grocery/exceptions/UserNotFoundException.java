package se.yrgo.grocery.exceptions;

import javax.ws.rs.NotFoundException;

public class UserNotFoundException extends NotFoundException{

	/**
	 * If login object could not be added.
	 *
 	 *	@extends NotFoundException - This exception is caught and will issue a rollback
	 */
	private static final long serialVersionUID = -5480452906602600218L;

}
