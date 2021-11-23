package se.yrgo.grocery.domain;


import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.validation.constraints.Size;

@Entity
public class Grocery implements java.io.Serializable {

	private static final long serialVersionUID = 3090615371178706749L;
	
	/**
	 * Variables for grocery
	 */
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	private long id;
	
	@Size(min = 3, max = 100)
	private String name;
	
	@Size(min = 3, max = 40)
	private String brand;
	
	@Size(min = 1)
	private String imageUrl;
	
	private double price;
	
	@Size(min = 0, max = 2000)
	private String description;
	
	private int expiredDate;
	
	private int stockOf;
	
	public Grocery() {}

	public Grocery(String name, double price, String description, int expiredDate, int stockOf, String brand, String imageUrl) {
		this.name = name;
		this.price = price;
		this.description = description;
		this.expiredDate = expiredDate;
		this.stockOf = stockOf;
		this.brand = brand;
		this.imageUrl = imageUrl;
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

	public int getStockOf() {
		return stockOf;
	}

	public void setStockOf(int stockOf) {
		this.stockOf = stockOf;
	}

	@Override
	public String toString() {
		return "Grocery [id=" + id + ", name=" + name + ", brand=" + brand + ", imageUrl=" + imageUrl + ", price="
				+ price + ", description=" + description + ", expiredDate=" + expiredDate + ", stockOf=" + stockOf
				+ "]";
	}

	
	
}
