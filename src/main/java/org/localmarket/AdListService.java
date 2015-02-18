package org.localmarket;

import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.core.Context;

import org.localmarket.data.AdvertiseDAO;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * 
 * @author mkurian
 *
 */

@Path("api/ads")
public class AdListService {

	private static final Logger logger = LoggerFactory
			.getLogger(AdListService.class);

	AdvertiseDAO dao = null;

	public AdListService() {
		dao = new AdvertiseDAO();
	}

	@GET
	public String adSubmission(@Context HttpServletRequest request) {

		try {
			String data = request.getReader().readLine();
			logger.info("Ad {}", data);
			if (data != null) {
				// Interest i = new Interest(data);
				dao.create(data);
			}
			return data.toString();
		} catch (Exception ex) {
			logger.error(ex.getMessage());
			return "error " + ex.getMessage();
		}
	}
}
