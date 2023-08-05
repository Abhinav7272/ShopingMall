package com.infy.ekart.product;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.springframework.boot.test.context.SpringBootTest;

import com.infy.ekart.product.dto.ProductDTO;
import com.infy.ekart.product.entity.Product;
import com.infy.ekart.product.exception.EKartProductException;
import com.infy.ekart.product.repository.ProductRepository;
import com.infy.ekart.product.service.CustomerProductServiceImpl;

@SpringBootTest
public class CustomerProductServiceTest {

	@Mock
	private ProductRepository productRepository;
	@InjectMocks
	private CustomerProductServiceImpl customerProductService ; 
	private Product product = new Product();


	private void setValuesOfProduct() { 
		this.product.setProductId(00001);
		this.product.setName("mobile");
		this.product.setBrand("samsung"); 
		this.product.setCategory("Electronis");
		this.product.setAvailableQuantity(5);
		this.product.setDescription("qwertyuiop");
		this.product.setPrice(1220.00);

	}

	ProductDTO productDTO = new ProductDTO();

	public void setValuesOfProductDTO(Product product1) {

		productDTO.setProductId(product1.getProductId());
		productDTO.setName(product1.getName());
		productDTO.setBrand(product1.getBrand());
		productDTO.setCategory(product1.getCategory());
		productDTO.setAvailableQuantity(product1.getAvailableQuantity());
		productDTO.setDescription(product1.getDescription());
		productDTO.setPrice(product1.getPrice());

	}

	//  valid test case for getAllProducts()
	@Test
	public void getAllProductsValidTest() throws EKartProductException{

		List<Product> iterableProducts = new ArrayList<Product>();

		this.setValuesOfProduct();

		iterableProducts.add(this.product);

		Mockito.when(productRepository.findAll()).thenReturn((Iterable<Product>)iterableProducts);


		List<ProductDTO> dtoProducts = new ArrayList<>();

		iterableProducts.forEach(product1 -> {

			this.setValuesOfProductDTO(product1);
			dtoProducts.add(this.productDTO);

		});

		List<ProductDTO> products = customerProductService.getAllProducts();

		Assertions.assertEquals(dtoProducts, products);
	}

	//  Invalid test case for getAllProducts()
	@Test
	public void getAllProductsInValidTest() throws EKartProductException{

		List<Product> iterableProducts = new ArrayList<Product>();

		Mockito.when(productRepository.findAll()).thenReturn((Iterable<Product>)iterableProducts);

		String expectedMsg = "General.EXCEPTION_MESSAGE";

		EKartProductException error = Assertions.assertThrows(EKartProductException.class, ()->{
			customerProductService.getAllProducts();
		});

		String actualMsg = error.getMessage();

		Assertions.assertEquals(expectedMsg, actualMsg);
	}


	//valid test case for getProductById()
	@Test
	public void getProductByIdValidTest() throws EKartProductException{

		Mockito.when(productRepository.findById(00001)).thenReturn(Optional.of(this.product));

		ProductDTO actualProductDTO = customerProductService.getProductById(00001);

		Assertions.assertEquals(this.productDTO, actualProductDTO);
	}

	//Invalid test case for getProductById()
	@Test
	public void getProductByIdInValidTest() throws EKartProductException{

		Mockito.when(productRepository.findById(00000)).thenReturn(Optional.empty());

		String expectedMsg = "ProductService.PRODUCT_NOT_AVAILABLE";

		EKartProductException error = Assertions.assertThrows(EKartProductException.class, ()->{
			customerProductService.getProductById(00000);
		});

		String actualMsg = error.getMessage();

		Assertions.assertEquals(expectedMsg, actualMsg);
	}

	//valid test case for reduceAvailableQuantity()
	@Test
	public void reduceAvailableQuantityValidTest() throws EKartProductException{

		this.setValuesOfProduct();
		Mockito.when(productRepository.findById(00001)).thenReturn(Optional.of(this.product));

		customerProductService.reduceAvailableQuantity(00001, 2);

		Assertions.assertEquals(3, this.product.getAvailableQuantity());
	}

	//Invalid test case for reduceAvailableQuantity()
	@Test
	public void reduceAvailableQuantityInValidTest() throws EKartProductException{

		Mockito.when(productRepository.findById(00000)).thenReturn(Optional.empty());

		String expectedMsg = "ProductService.PRODUCT_NOT_AVAILABLE";

		EKartProductException error = Assertions.assertThrows(EKartProductException.class, ()->{
			customerProductService.reduceAvailableQuantity(00000 ,2);
		});

		String actualMsg = error.getMessage();

		Assertions.assertEquals(expectedMsg, actualMsg);
	}



}
