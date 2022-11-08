package com.dorecipe.main.event.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.dorecipe.main.event.dao.EventDAO;
import com.dorecipe.main.event.vo.EventVO;

@Service
public class EventService {

	@Autowired
	private EventDAO eventDAO;
	
	public List<EventVO> getList(){
		List<EventVO> eList = eventDAO.getList();
		return eList;
	}

	public EventVO getDetail(int event_num) {
		EventVO eventVO = eventDAO.getDetail(event_num);
		return eventVO;
	}

	
	public int deleteEvent(int event_num) {
		return eventDAO.deleteEvent(event_num);
	}

	public int insertEvent(EventVO eventVO) {
		return eventDAO.insertEvent(eventVO);
	}
	
	public int updateEvent(EventVO eventVO) {
		return eventDAO.updateEvent(eventVO);
	}

	
}
