package com.dorecipe.main.event.dao;

import java.util.List;

import com.dorecipe.main.event.vo.EventVO;


public interface EventDAO {

	List<EventVO> getList();

	EventVO getDetail(int event_num);
	
	int insertEvent(EventVO eventVO);
	
	int deleteEvent(int event_num);
	
	int updateEvent(EventVO eventVO);
	
}
