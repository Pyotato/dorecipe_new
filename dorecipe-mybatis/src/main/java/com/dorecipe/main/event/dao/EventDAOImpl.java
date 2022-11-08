package com.dorecipe.main.event.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.dorecipe.main.event.vo.EventVO;

@Repository
public class EventDAOImpl implements EventDAO {

   @Autowired
   SqlSession sqlSession;
   
//   private EventDAO mapper;
   private EventDAO eventDAO;
   
//   @Autowired
//   public EventDAOImpl(SqlSession sqlSession) {
//      mapper = sqlSession.getMapper(EventDAO.class);
//   }
   
   @Override
   public List<EventVO> getList() {
//      return mapper.getList();
      List<EventVO> eventList = null;
      eventList = sqlSession.selectList("mapper.event.getList");
      
      return eventList;
   }
   
   @Override
   public EventVO getDetail(int event_num) {
//      return mapper.getDetail(event_num);
      return sqlSession.selectOne("mapper.event.getDetail", event_num);
   }
   
   @Override
   public int insertEvent(EventVO eventVO) {
//      return mapper.insertEvent(eventVO);
      return sqlSession.insert("mapper.event.insertEvent", eventVO);
   }
   
   @Override
   public int deleteEvent(int event_num) {
//      return mapper.deleteEvent(event_num);
      return sqlSession.delete("mapper.event.deleteEvent", event_num);
   }
   
   @Override
   public int updateEvent(EventVO eventVO) {
//      return mapper.updateEvent(eventVO);
      return sqlSession.update("mapper.event.updateEvent", eventVO);
   }
   
}