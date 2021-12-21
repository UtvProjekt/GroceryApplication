package se.yrgo.grocery.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.validation.constraints.Size;

@Entity
public class Login implements java.io.Serializable {

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
	private String surname;

	public Login() {

	}

	public Login(String email, String password, String firstname, String surname) {
		this.email = email;
		this.password = password;
		this.firstname = firstname; 
		this.surname = surname;
	}

	public String getFirstname() {
		return firstname;
	}
	
	public void setFirstname(String firstName) {
		this.firstname = firstName;
	}
	
	public String getSurname() {
		return surname;
	}
	
	public void setSurname(String surName) {
		this.surname = surName;
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

}
