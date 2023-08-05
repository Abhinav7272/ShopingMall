package com.infy.ekart.product.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.infy.ekart.product.dto.ProductDTO;
import com.infy.ekart.product.entity.Product;
import com.infy.ekart.product.exception.EKartProductException;
import com.infy.ekart.product.repository.ProductRepository;


//Add the missing annotations
@Service(value = "customerProductService")
@Transactional
public class CustomerProductServiceImpl implements CustomerProductService {
	@Autowired
	private ProductRepository productRepository;
	//This method is used to retrieve the list of all the products from database
	//Invoke appropriate method of ProductRepository, to fetch product details
	//which in turn returns a list.
	//for each product found, create and populate the ProductDTO object and add 
	//it to a List<ProductDTO>.
	//Return the above obtained list
	@Override
	public List<ProductDTO> getAllProducts() throws EKartProductException {
	      Iterable<Product> products = productRepository.findAll();
	        List<ProductDTO> list = new ArrayList<>();
	        products.forEach(product -> {
	            ProductDTO productDTO = new ProductDTO();
	            productDTO.setProductId(product.getProductId());
	            productDTO.setName(product.getName());
	            productDTO.setBrand(product.getBrand());
	            productDTO.setCategory(product.getCategory());
	            productDTO.setAvailableQuantity(product.getAvailableQuantity());
	            productDTO.setDescription(product.getDescription());
	            productDTO.setPrice(product.getPrice());
	            list.add(productDTO);
	        });
	        if(list.isEmpty()) {
	        	throw new EKartProductException("General.EXCEPTION_MESSAGE");
	        }
	        return list;
	}

	//This method is used to fetch Product details of the product with the given productId
	//Invoke appropriate method of ProductRepository which will retrieve the product
	//details using the given productId (available in ProductDTO). 
	//If product exists for the given productId return the product details
	//Else, If productId does not exist, then throw an object of EKartProductException with 
	//message â€œProductService.PRODUCT_NOT_AVAILABLEâ€�
	@Override
	    public ProductDTO getProductById(Integer productId) throws  EKartProductException{
	        //Write your logic here
	        Optional<Product> optional = productRepository.findById(productId);
	        Product product = optional.orElseThrow(() ->
	                new EKartProductException("ProductService.PRODUCT_NOT_AVAILABLE"));
	        ProductDTO productDTO = new ProductDTO();
	        productDTO.setProductId(product.getProductId());
	        productDTO.setName(product.getName());
	        productDTO.setBrand(product.getBrand());
	        productDTO.setCategory(product.getCategory());
	        productDTO.setAvailableQuantity(product.getAvailableQuantity());
	        productDTO.setDescription(product.getDescription());
	        productDTO.setPrice(product.getPrice());
	        return productDTO;
	    }
	
	// This method is used to reduce the available quantity of product 
	// Invoke appropriate methods of ProductRepository to retrieve the product 
	// details using the given productId 
	// If product does not exist, then throw an object of EkartProductException 
	// with message â€œProductService.PRODUCT_NOT_AVAILABLEâ€�
	// Else, reduce the quantity of the retrieved product with the given number of quantity
	 @Override
	    public void reduceAvailableQuantity(Integer productId, Integer quantity) throws EKartProductException {
	        //Write your logic here
	        Optional<Product> optional = productRepository.findById(productId);
	        Product product = optional.orElseThrow(() ->
	                new EKartProductException("ProductService.PRODUCT_NOT_AVAILABLE"));
	        product.setAvailableQuantity(product.getAvailableQuantity() - quantity);
	    }
}
