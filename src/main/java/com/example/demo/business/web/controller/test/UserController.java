package com.example.demo.business.web.controller.test;

import com.example.demo.business.model.User;
import com.example.demo.business.web.validator.GtZero;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpSession;
import javax.validation.constraints.NotNull;
import java.util.*;

@RestController
@RequestMapping(value = "/users")     // 通过这里配置使下面的映射都在/users下
@SessionAttributes({"sessionUser"})
public class UserController {

    // 创建线程安全的Map
    private static Map<Long, User> users = Collections.synchronizedMap(new HashMap<Long, User>());

    @RequestMapping(value = "/", method = RequestMethod.GET)
    public List<User> getUserList() {
        // 处理"/users/"的GET请求，用来获取用户列表
        // 还可以通过@RequestParam从页面中传递参数来进行查询条件或者翻页信息的传递
        return new ArrayList<User>(users.values());
    }

    @RequestMapping(value = "/", method = RequestMethod.POST)
    public String postUser(@ModelAttribute User user) {
        // 处理"/users/"的POST请求，用来创建User
        // 除了@ModelAttribute绑定参数之外，还可以通过@RequestParam从页面中传递参数
        users.put(user.getId(), user);
        return "success";
    }

    @Cacheable("users")
    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public User getUser(@PathVariable Long id) {
        // 处理"/users/{id}"的GET请求，用来获取url中id值的User信息
        // url中的id可通过@PathVariable绑定到函数的参数中
        return users.get(id);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.PUT)
    public String putUser(@PathVariable Long id, @ModelAttribute User user) {
        // 处理"/users/{id}"的PUT请求，用来更新User信息
        User u = users.get(id);
        u.setName(user.getName());
        u.setAge(user.getAge());
        users.put(id, u);
        return "success";
    }

    @RequestMapping(value = "/testSession", method = RequestMethod.POST)
    public String testSession(HttpSession session, User user) {
        session.setAttribute("sessionUser", user);
        return "test Session success";
    }

    @RequestMapping(value = "/testFile/{id}", method = RequestMethod.POST)
    public String testFile(@PathVariable Long id, @RequestParam("name") String name, @ModelAttribute User user, @CookieValue("passwordTime") Long passwordTime,
                           @SessionAttribute User sessionUser,
                           @RequestParam("file") MultipartFile[] files) {
        // 处理"/users/{id}"的PUT请求，用来更新User信息
        User u = users.get(id);
        users.put(id, u);
        return "success";
    }


    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public String deleteUser(@PathVariable Long id) {
        // 处理"/users/{id}"的DELETE请求，用来删除User
        users.remove(id);
        return "success";
    }

    @RequestMapping(value = "/valid/{id}", method = RequestMethod.POST)
    //可以不要pathvarilab
    public String validUser(@NotNull User user) {
        return "valid success";
    }

    @RequestMapping(value = "/validTest/{id}", method = RequestMethod.POST)
    public String validTest(@GtZero Long id) {
        return "valid test success";
    }

}