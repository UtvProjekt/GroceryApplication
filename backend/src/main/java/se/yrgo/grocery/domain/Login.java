package se.yrgo.grocery.domain;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.validation.constraints.Size;

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

	private boolean admin;
	
	public Login() {

	}

	public Login(String email, String password, String firstname, String lastname, boolean admin) {
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

	@Override
	public String toString() {
		return "Login [id=" + id + ", email=" + email + ", password=" + password + "]";
	}

	public boolean isAdmin() {
		return admin;
	}

	public void setAdmin(boolean admin) {
		this.admin = admin;
	}

}
