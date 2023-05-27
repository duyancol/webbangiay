package com.example.demo.controller;
import com.example.demo.Entity.*;
import com.example.demo.Ex.CartNotFoundException;
import com.example.demo.reposity.CartRepository;
import jakarta.persistence.EntityManager;
import jakarta.persistence.TypedQuery;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Root;
import jakarta.servlet.ServletContext;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import com.example.demo.Ex.UserNotFoundException;
import java.util.Optional;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import org.springframework.core.io.Resource;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/v1/auth")
public class TestController {
    @Autowired private ProductService service1;
    @Autowired private ProductRepository productRepository;
    @Autowired private UserService userService;
    @Autowired private ProductDao productDao;

    @GetMapping("students1")
    List<Product> getProductAll(){

        return  service1.listAllProduct();

    }
    @GetMapping("/product10_20")
    List<Product> getProductPrice10_20(){

        return  productDao.findProductsInRange10_20();

    }
    @Autowired ServletContext app;
    @Autowired
    private FileStorageService fileStorageService;


//        public ResponseEntity<String> addProduct(@RequestPart("name") String name,
//
//                                                 @RequestPart("img") MultipartFile img) {
//            try {
//                // Tiến hành lưu tệp tin lên server
//                String fileName = img.getOriginalFilename();
//                String filePath = "C:\\Users\\LAPTOP USA PRO\\eclipse-workspace\\demo10\\src\\main\\resources\\static\\images\\img\\" + fileName;
//                img.transferTo(new File(filePath));
//
//                // Tiến hành xử lý lưu thông tin sản phẩm vào database
//                Product product = new Product(name, fileName);
//                productRepository.save(product);
//                return new ResponseEntity<>("Save product successfully", HttpStatus.OK);
//            } catch (IOException e) {
//                e.printStackTrace();
//                return new ResponseEntity<>("Error when saving product", HttpStatus.INTERNAL_SERVER_ERROR);
//            }
//        }

    @PostMapping("/addproduct")
    public ResponseEntity<String> addProduct(@RequestParam("name") String name,
                                             @RequestParam("price") int price,
                                             @RequestParam("quantity") int quantity,
                                             @RequestParam("img") MultipartFile img,
                                             @RequestParam("category") String category,
                                             @RequestParam("derectory") String derectory,
                                             HttpServletRequest request) throws IOException {

            String fileName = fileStorageService.storeFile(img);
        String fileDownloadUri = ServletUriComponentsBuilder.fromCurrentContextPath()
                .path("/images/img/")
                .path(fileName)
                .toUriString();
            Product product = new Product(name,price,quantity,fileName,category,derectory);
            productRepository.save(product);
            return ResponseEntity.ok("Thêm sản phẩm thành công!");

    }
    @GetMapping("/images/img/{filename:.+}")
    @ResponseBody
    public ResponseEntity<Resource> serveFile(@PathVariable String filename) {
        Resource file = fileStorageService.loadFileAsResource(filename);
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + file.getFilename() + "\"")
                .body(file);
    }




    @GetMapping("/getProduct/{id}")
    public Product getProductById(@PathVariable("id") int id){
        Product p = service1.findByProductId(id);
//        model.addAttribute("p",p);
//        System.out.println(p.getId());
        Product product = productRepository.findById(id).orElseThrow(()-> new UserNotFoundException(id));
        return product;

    }
    @GetMapping("/get3ProductNew")
    List<Product> get3ProductNew(){
        return  service1.listAll();
    }
    @GetMapping("/getNext3Product/{count}/{limit}")
    List<Product> getNext3Product(@PathVariable("count") int count,@PathVariable("limit") int limit){
        return  service1.findByName(count,limit);
    }
//    @PutMapping("/editProduct/{id}")
//    public Product editProduct(@RequestBody Product newProduct,@PathVariable("id") int id){
//        Product p = service1.findByProductId(id);
////        model.addAttribute("p",p);
////        System.out.println(p.getId());
//        Product product = productRepository.findById(id).map(user->{
//            user.setName(newProduct.getName());
//            user.setImg(newProduct.getImg());
//            return productRepository.save(user);
//        }).orElseThrow(()-> new UserNotFoundException(id));
//        return product;
//
//    }
@PutMapping(value = "/editProduct/{id}", consumes = {"multipart/form-data"})
public Product editProduct(@RequestParam("name") String name,
                           @RequestParam("price") int price,
                           @RequestParam("quantity") int quantity,

                           @RequestParam("category") String category,
                           @RequestParam("derectory") String derectory, @RequestPart(value = "img", required = false) MultipartFile img,@PathVariable("id") int id) {
    Product p = service1.findByProductId(id);

    if (img != null && !img.isEmpty()) {

        String fileName = fileStorageService.storeFile(img);
        String fileDownloadUri = ServletUriComponentsBuilder.fromCurrentContextPath()
                .path("/images/img/")
                .path(fileName)
                .toUriString();
        Product product = productRepository.findById(id).map(user->{
            user.setName(name);
            user.setPrice(price);
            user.setQuantity(quantity);
            user.setImg(fileName);
            user.setCategory(category);
            user.setDerectory(derectory);
            return productRepository.save(user);
        }).orElseThrow(()-> new UserNotFoundException(id));
        return product;
    }else{
        Product product = productRepository.findById(id).map(user->{
            user.setName(name);
            user.setPrice(price);
            user.setQuantity(quantity);

            user.setCategory(category);
            user.setDerectory(derectory);
            return productRepository.save(user);
        }).orElseThrow(()-> new UserNotFoundException(id));
        return product;
    }

}

    @DeleteMapping("deleteProduct/{id}")
    public String getDeleteById(@PathVariable("id") int id){
if(!productRepository.existsById(id)){
    throw new UserNotFoundException(id);
}

         productRepository.deleteById(id);
        return "User with id" +id+ "hasbeen delete" ;

    }

//    @PostMapping("/addtocart/{id}")
//    Cart addProducttoCartNull(@PathVariable("id") int id){
//
//        Product product =service1.findByProductId(id);
//
//        if(product != null){
//            Cart cart;
//if(cart==null){
//     cart = Cart.getInstance() ;
//}
//
//
//
//
//                cart.put(product);
//            System.out.println(cart.getProductList());
//
//
//
//            return cart;
//        }
//        return  cart;
//    }
//    @PostMapping("addCart1/{id}")
//
//    public Cart addCart(@PathVariable("id") int id){
//        Cart cart;
//        Product product =service1.findByProductId(id);
//        if(product != null){
//
//            cart = (Cart) session.getAttribute("cart");
//            if(cart == null){
//                cart=Cart.getInstance();
//            }
//            cart.put(product);
//            session.setAttribute("cart",cart);
//
//            return cart;
//        }
//        return null;
//
//
//
//    }

    @PostMapping ("/checkLogin1/{email}/{password}")
    public  String checkLogin1(@PathVariable("email") String email, @PathVariable("password") String password, ModelMap modelMap){
//        if(userBean.getEmail().equals(email) && userBean.getPassword().equals(password)){
//            System.out.println("Login thanh cong");
//            return "index";
//        }else{
//            System.out.println("Login k thanh cong");
//        }
        if(userService.checkLogin(email,password)){

            System.out.println("thanh cong");

            modelMap.addAttribute("email",email);
            return  "index";

        }else{
            System.out.println("that bai");
            return  "login2";
        }



    }
    @PostMapping("/check12")
    user checkLogin(@RequestBody user u){
        if(userService.checkLogin(u.getEmail(),u.getPassword())){


            System.out.println("thanh cong");

//            modelMap.addAttribute("email",email);
            return  u;

        }else{
            System.out.println("that bai");
            return  u;
        }

//        return  productRepository.save(product);
    }
//@Autowired
//    private CartService cartService;
//
//    // ...
//
//    @PostMapping("/save")
//    public ResponseEntity<Cart> saveCart(@RequestBody Cart cart) {
//        Cart savedCart = cartService.save(cart);
//        return ResponseEntity.ok(savedCart);
//    }

    @Autowired
    private CartService cartService;

    @PostMapping("/save")
    public ResponseEntity<String> saveCart(@RequestBody String cartJson) {
        //String s =  "{items"+": " +cartJson+"}";
        cartService.saveCart(cartJson);
        return ResponseEntity.ok().build();
    }
    @Autowired
    private CartRepository cartRepository;
    @GetMapping("/order/{id}")
    public List<Cart> getCartsByUserId(@PathVariable String id) {
        List<Cart> carts = cartRepository.findByUserID(id);
        for (Cart cart : carts) {
            // load cartItems if necessary
            cart.getCartItems();
        }
        return carts;
    }
    @GetMapping("/cart/{userId}")
    public ResponseEntity<CartDto> getCartByUserId(@PathVariable String userId) {
        CartDto cartDto = cartService.getCartWithProductsByUserId(userId);
        if (cartDto == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(cartDto);
    }
    @GetMapping("/viewOrderAdmin")
    public List<Cart> getOrderAdmin(@RequestParam("date") String date) {

        return cartRepository.findAllByCreatedAtLikeS(date);
    }
    @GetMapping("/viewAllOrder")
    public List<Cart> getAllOrderAdmin() {

        return cartRepository.findAll();
    }

    @GetMapping("/viewChart")
    public List<CartDto> getOrderChart(@RequestParam("date") String date) {

        List<CartDto> carts = cartService.getCartsWithProductsByUserId(date);

        return carts;
    }
    @PutMapping("/updateStatus")
    public Cart updateStatus(@RequestParam("status") String status,@RequestParam("id") long id){

        Cart cart = cartRepository.findById(id).map(c->{
            c.setStatus(status);

            return cartRepository.save(c);
        }).orElseThrow(()-> new CartNotFoundException(id));
        return cart;

    }
    @PutMapping("/updateStatusHuy")
    public Cart updateStatusHuyDonhang(@RequestParam("id") long id){

        Cart cart = cartRepository.findById(id).map(c->{
            c.setStatus("0");

            return cartRepository.save(c);
        }).orElseThrow(()-> new CartNotFoundException(id));
        return cart;

    }


}
