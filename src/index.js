import { Hono } from 'hono';
import { cors } from 'hono/cors';

const app = new Hono();

class IpDetails {
	constructor(ip, country, timezone, city, region, longitude, latitude, postalCode, regionCode) {
		this.ip = ip;
		this.country = country;
		this.timezone = timezone;
		this.city = city;
		this.region = region;
		this.longitude = longitude;
		this.latitude = latitude;
		this.postalCode = postalCode;
		this.regionCode = regionCode;
	}
}

const View = (siteData) => {
	return `
	  <!DOCTYPE html>
	  <html lang="en">
		<head>
		  <meta charset="UTF-8">
		  <meta name="viewport" content="width=device-width, initial-scale=1.0">
		  <title>Know Your IP Address | IP Lookup Tool</title>
		  <meta name="description" content="Find out what is your IP address and country location. Free IP address lookup tool.">
		  <meta name="keywords" content="know your IP, what is my IP address, what is my IP, IP lookup, IP checker">
		  
		  <!-- Bootstrap CSS -->
		  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
		  
		  <style>
			body {
			  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
			  min-height: 100vh;
			}
			.label {
			  font-weight: 600;
			  color: #495057;
			}
			.value {
			  color: #0d6efd;
			  font-size: 1.1rem;
			}
		  </style>
		</head>
		<body class="flex w-100 items-center justify-center h-screen">
		  <div class="container">
			<div class="row justify-content-center">
			  <div class="col-12 col-md-8 col-lg-6 mt-5">
				<div class="card shadow-lg">
				  <div class="card-header bg-primary text-white">
					<h1 class="h3 mb-0">IP Address Details</h1>
				  </div>
				  <div class="card-body">
					<div class="row mb-2">
					  <div class="col-5 text-start label">Your IP Address:</div>
					  <div class="col-7 text-start value">${siteData.ip}</div>
					</div>
					<div class="row mb-2">
					  <div class="col-5 text-start label">Your Country:</div>
					  <div class="col-7 text-start value">${siteData.country}</div>
					</div>
					<div class="row mb-2">
					  <div class="col-5 text-start label">Your Timezone:</div>
					  <div class="col-7 text-start value">${siteData.timezone}</div>
					</div>
					<div class="row mb-2">
					  <div class="col-5 text-start label">Your City:</div>
					  <div class="col-7 text-start value">${siteData.city}</div>
					</div>
					<div class="row mb-2">
					  <div class="col-5 text-start label">Your Region:</div>
					  <div class="col-7 text-start value">${siteData.region}</div>
					</div>
					<div class="row mb-2">
					  <div class="col-5 text-start label">Your Longitude:</div>
					  <div class="col-7 text-start value">${siteData.longitude}</div>
					</div>
					<div class="row mb-2">
					  <div class="col-5 text-start label">Your Latitude:</div>
					  <div class="col-7 text-start value">${siteData.latitude}</div>
					</div>
					<div class="row mb-2">
					  <div class="col-5 text-start label">Your PostalCode:</div>
					  <div class="col-7 text-start value">${siteData.postalCode}</div>
					</div>
					<div class="row">
					  <div class="col-5 text-start label">Your RegionCode:</div>
					  <div class="col-7 text-start value">${siteData.regionCode}</div>
					</div>
				  </div>
				</div>
			  </div>
			</div>
		  </div>

		<!-- Footer -->
		<footer class="text-center py-3" style="font-size: 14px; color: gray;">
			<a href="https://isitholiday.com" class="mx-2 text-decoration-none text-muted">Is It Holiday Today?</a>
		</footer>
		  
		  <!-- Bootstrap JS -->
		  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
		</body>
	  </html>
	`;
};

app.use('*', cors());

app.get('/favicon.ico', (c) => c.body(null, 204));

app.get('/api/locations', (c) => {
	try {
		let ipDetails = getIpDetails(c);
		return c.json(ipDetails);
	} catch (e) {
		return c.json({ error: e.message || "Internal Server Error" }, 500);
	}
});

app.get('/', (c) => {
	var ipDetails = getIpDetails(c);
	return c.html(View(ipDetails));
});

app.get('*', (c) => c.json({ error: "Not found." }, 404));

function getIpDetails(c) {

	let ip = c.req.header('cf-connecting-ipv4') || 
	c.req.header('x-real-ip') ||
	c.req.header('cf-connecting-ip') ||
	"Not Available";

	let ipDetails = new IpDetails(
		ip,
		c.req.raw.cf?.country || "Unknown",
		c.req.raw.cf?.timezone || "Unknown",
		c.req.raw.cf?.city || "Unknown",
		c.req.raw.cf?.region || "Unknown",
		c.req.raw.cf?.longitude || "Unknown",
		c.req.raw.cf?.latitude || "Unknown",
		c.req.raw.cf?.postalCode || "Unknown",
		c.req.raw.cf?.regionCode || "Unknown"
	);

	return ipDetails;
}

export default app;
