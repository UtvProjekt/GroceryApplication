package se.yrgo.grocery.domain;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.validation.constraints.Size;

/**
 * 
 * Domain class for Grocery
 *
 */
@Entity
public class Grocery implements Serializable {

	private static final long serialVersionUID = 3090615371178706749L;

	/**
	 * Variables for grocery
	 */
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long id;
	
	@Size(min=0, max=4000)
	private String name;
	
	@Size(min=0, max=4000)
	private String brand;
	
	@Size(min=0, max=4000)
	private String category;
	
	@Size(min=0, max=4000)
	private String imageUrl;

	@Size(min=0, max=4000)
	private String description;
	
	private double price;

	private int expiredDate;

	private int totalOfProduct;

	public Grocery() {}

	/**
	 * Grocery object constructor, matches database layout
	 * 
	 * @param brand
	 * @param category
	 * @param description
	 * @param expiredDate
	 * @param imageUrl
	 * @param name
	 * @param price
	 * @param totalOfProduct
	 */
	public Grocery(String brand, String category, String description, int expiredDate, String imageUrl, String name,
			double price, int totalOfProduct) {
		super();
		this.brand = brand;
		this.category = category;
		this.description = description;
		this.expiredDate = expiredDate;
		this.imageUrl = imageUrl;
		this.name = name;
		this.price = price;
		this.totalOfProduct = totalOfProduct;
	}

	public String getImageUrl() {
		return imageUrl;
	}

	public void setImageUrl(String imageUrl) {
		this.imageUrl = imageUrl;
	}

	public String getBrand() {
		return brand;
	}

	public void setBrand(String brand) {
		this.brand = brand;
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public double getPrice() {
		return price;
	}

	public void setPrice(double price) {
		this.price = price;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public int getExpiredDate() {
		return expiredDate;
	}

	public void setExpiredDate(int expiredDate) {
		this.expiredDate = expiredDate;
	}

	public String getCategory() {
		return category;
	}

	public void setCategory(String category) {
		this.category = category;
	}

	public int getTotalOfProduct() {
		return totalOfProduct;
	}

	public void setTotalOfProduct(int totalOfProduct) {
		this.totalOfProduct = totalOfProduct;
	}

	@Override
	public String toString() {
		return "Grocery [id=" + id + ", name=" + name + ", brand=" + brand + ", category=" + category + ", imageUrl="
				+ imageUrl + ", price=" + price + ", description=" + description + ", expiredDate=" + expiredDate
				+ ", totalOfProduct=" + totalOfProduct + "]";
	}

	

}
