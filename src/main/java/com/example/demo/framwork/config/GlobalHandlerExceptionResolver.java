package com.example.demo.framwork.config;

import com.alibaba.fastjson.JSON;
import com.example.demo.framwork.base.model.ResultBean;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.HandlerExceptionResolver;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

public class GlobalHandlerExceptionResolver implements HandlerExceptionResolver {
    private static final Logger LOG = LoggerFactory.getLogger(GlobalHandlerExceptionResolver.class);

    /**
     * 在这里处理所有得异常信息
     */
    @Override
    public ModelAndView resolveException(HttpServletRequest req, HttpServletResponse response, Object o, Exception ex) {
        ModelAndView mv = new ModelAndView("/base/error");
        HandlerMethod me = (HandlerMethod) o;
        if (me.getBean().getClass().isAnnotationPresent(RestController.class) || me.getMethod().isAnnotationPresent(ResponseBody.class)) {
            ResultBean resultBean = new ResultBean(1, ex.getMessage(), null, "error");
            String resultStr = JSON.toJSONString(resultBean, true);
            /*  使用response返回    */
            response.setStatus(HttpStatus.OK.value()); //设置状态码
            response.setContentType(MediaType.APPLICATION_JSON_VALUE); //设置ContentType
            response.setCharacterEncoding("UTF-8"); //避免乱码
            response.setHeader("Cache-Control", "no-cache, must-revalidate");
            try {
                response.getWriter().write(resultStr);
            } catch (IOException e) {
                LOG.error("与客户端通讯异常:" + e.getMessage(), e);
            }
            return new ModelAndView();
        }
        LOG.error("异常:" + ex.getMessage(), ex);
        mv.addObject("errorMsg", ex.getMessage());
        mv.addObject("errorStatus", response.getStatus());
        return mv;
    }

    /**
     * 将错误信息添加到response中
     *
     * @param msg
     * @param response
     */
    public static void printWrite(String msg, HttpServletResponse response) {
        try {
            PrintWriter pw = response.getWriter();
            pw.write(msg);
            pw.flush();
            pw.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
