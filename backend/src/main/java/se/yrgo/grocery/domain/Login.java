package se.yrgo.grocery.domain;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.validation.constraints.Size;

/**
 * Domain class for Login
 *
 *
 */
@Entity
public class Login implements Serializable {

	private static final long serialVersionUID = 3090615371178706749L;

	/**
	 * Variables for login
	 */
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long id;

	@Column(unique = true)
	@Size(min = 3, max = 100)
	private String email;

	@Size(min = 3)
	private String password;
	
	@Size(min = 0)
	private String firstname;
	
	@Size(min = 0)
	private String lastname;

	@Column(nullable = false, columnDefinition = "BIT")
	private int admin;
	
	public Login() {

	}
	/**
	 * Login object constructor, matches database layout
	 * @param email
	 * @param password
	 * @param firstname
	 * @param lastname
	 * @param admin
	 */
	public Login(String email, String password, String firstname, String lastname, int admin) {
		this.email = email;
		this.password = password;
		this.firstname = firstname; 
		this.lastname = lastname;
		this.admin = admin;
	}

	public String getFirstname() {
		return firstname;
	}
	
	public void setFirstname(String firstName) {
		this.firstname = firstName;
	}
	
	public String getLastname() {
		return lastname;
	}
	
	public void setLastname(String surName) {
		this.lastname = surName;
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public int isAdmin() {
		return admin;
	}
	
	public void setAdmin(int admin) {
		this.admin = admin;
	}
	
	@Override
	public String toString() {
		return "Login [id=" + id + ", email=" + email + ", password=" + password + "]";
	}


}
