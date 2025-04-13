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
		this.timestamp = new Date().toISOString();
		this.localTime = timezone !== "Unknown" 
			? new Date().toLocaleString('en-US', { timeZone: timezone })
			: new Date().toLocaleString('en-US');
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
      <link rel="icon" type="image/x-icon" href="favicon.ico">
		  <!-- CSS -->
        <style>
          :root {
            --primary-color: #0d6efd;
            --secondary-color: #495057;
            --background-color: darkslategray;
            --white: #fff;
            --gray: #6c757d;
          }
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          body {
            font-family: 'Poppins', sans-serif;
            background-color: var(--background-color);
            color: var(--white);
            margin: 0;
            min-height: 100vh;
            position: relative;
            padding-bottom: 80px;
          }
          .container {
            width: 100%;
            max-width: 1200px;
            margin: 0 auto;
            padding: 15px;
          }
          .row {
            display: flex;
            flex-wrap: wrap;
            width: 100%;
            margin: 0;
          }
          .col-12 {
            width: 100%;
            padding: 0 15px;
          }
          .col-5 {
            width: 41.666667%;
            padding-right: 15px;
          }
          .col-7 {
            width: 58.333333%;
          }

          @media (min-width: 768px) {
            .col-md-8 {
              width: 66.666667%;
              margin: 0 auto;
            }
          }
          @media (min-width: 992px) {
            .col-lg-6 {
              width: 50%;
              margin: 0 auto;
            }
          }
          .card {
            background-color: var(--white);
            border-radius: 0.5rem;
            box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
            margin-top: 2rem;
          }
          .card-header {
            background-color: var(--gray);
            color: var(--white);
            padding: 1rem;
            border-top-left-radius: 0.5rem;
            border-top-right-radius: 0.5rem;
          }
          .card-body {
            padding: 1rem;
          }

          .card-body .row {
            margin-bottom: 0.5rem;
          }

          .card-body .row:last-child {
            margin-bottom: 0;
          }

          .label {
            font-weight: 600;
            color: var(--secondary-color);
          }
          .value {
            color: var(--gray);
            font-size: 1.1rem;
          }
          .footer {
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 60px;
            background-color: rgba(255, 255, 255, 0.9);
            backdrop-filter: blur(10px);
            box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
            display: flex;
            justify-content: center;
            align-items: center;
          }
          .footer-link {
            color: var(--primary-color);
            font-weight: 500;
            text-decoration: none;
            transition: all 0.3s ease;
            padding: 8px 16px;
            border-radius: 20px;
            display: inline-flex;
            align-items: center;
          }
          .footer-link:hover {
            background-color: var(--primary-color);
            color: var(--white);
            transform: translateY(-2px);
          }
          .text-start { text-align: left; }
          .text-white { color: var(--white); }
          .justify-content-center { justify-content: center; }
          .items-center { align-items: center; }
          .mb-0 { margin-bottom: 0; }
          .mb-2 { margin-bottom: 0.5rem; }
          .mt-5 { margin-top: 3rem; }
          .me-2 { margin-right: 0.5rem; }
          .shadow-lg { box-shadow: 0 1rem 3rem rgba(0,0,0,.175); }
          .h3 { font-size: 1.75rem; }
          .bg-secondary { background-color: var(--gray); }
        </style>
		</head>
		<body class="flex w-100 items-center justify-center h-screen">
		  <div class="container">
			<div class="row justify-content-center">
			  <div class="col-12 col-md-8 col-lg-6 mt-5">
				<div class="card shadow-lg">
				  <div class="card-header bg-secondary text-white">
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
					<div class="row mb-2">
					  <div class="col-5 text-start label">Local Time:</div>
					  <div class="col-7 text-start value">${siteData.localTime}</div>
					</div>
					<div class="row">
					  <div class="col-5 text-start label">UTC Time:</div>
					  <div class="col-7 text-start value">${siteData.timestamp}</div>
					</div>
				  </div>
				</div>
			  </div>
			</div>
		  </div>

		<!-- Footer -->
		<footer class="footer d-flex justify-content-center align-items-center">
          <a href="https://isitholiday.com" class="footer-link d-inline-flex align-items-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-calendar-event me-2" viewBox="0 0 16 16">
              <path d="M11 6.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1z"/>
              <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z"/>
            </svg>  
            Check Today's Holidays →
          </a>
        </footer>	
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

	let timezone = c.req.raw.cf?.timezone || "Unknown";

	let ipDetails = new IpDetails(
		ip,
		c.req.raw.cf?.country || "Unknown",
		timezone,
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
