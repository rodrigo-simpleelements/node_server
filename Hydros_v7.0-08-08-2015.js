
var pg = require("pg");
var Sparky = require('sparky')
var http = require("http")
var url = require("url");
var querystring = require("querystring");
var async = require("async");
var gen = require("./Gen");
var crypto = require('crypto')
var moment = require('moment');
var json = require('json');
var https = require('https');
var connectunit = require("./controler");
//var utils = require('utils');


//var conString = "pg://postgres:pmasri@localhost:5432/hydros_v2";
var conString = "pg://postgres:Actimel@localhost:5432/hydros_v2";

function onRequest(request, response) {
    var pathname = url.parse(request.url).pathname;
    console.log("Petición para " + pathname + " recibida.");
    //response.writeHead(200, {"Content-Type": "application/json"});
	console.log(request.url);
	var client = new pg.Client(conString);
		if (pathname === '/login') {
			login(pathname, client, response, request);
		} else {
			if (pathname === '/getWaterProviders') {
				getWaterProviders(pathname, client, response, request );
			} else {
				if (pathname === '/signup') {
					signup(pathname, client, response, request);
				} else {
					if (pathname === '/insertUnitProvider') {
						insertUnitProvider(pathname, client, response, request);
					} else {
						if (pathname === '/insertUnit') {
							insertUnit(pathname, client, response, request);
						} else {
							if (pathname === '/updateUnit') {
								updateUnit(pathname, client, response, request);
							} else {
								if (pathname === '/insertSensor') {
									insertSensor(pathname, client, response, request);
								} else {
									if (pathname === '/updateSensor') {
										updateSensor(pathname, client, response, request);
									} else {
										if (pathname === '/getProfileUserData') {
											getProfileUserData(pathname, client, response, request);
										} else {
											if (pathname === '/getProfileUnitData') {
												getProfileUnitData(pathname, client, response, request);
											} else {
												if (pathname === '/getProfileSensorData') {
													getProfileSensorData(pathname, client, response, request);
												} else {
													if (pathname === '/updateProfile') {
														updateProfile(pathname, client, response, request);
													} else {
														if (pathname === '/updatesecret') {
															updatesecret(pathname, client, response, request);
														} else {
															if (pathname === '/updateUnitProvider') {
																updateUnitProvider(pathname, client, response, request);
															} else {
																if (pathname === '/getSensorData') {
																	getSensorData(pathname, client, response, request);
																} else {
																	if (pathname === '/DeleteZone') {
																		DeleteZone(pathname, client, response, request);
																	} else {
																		if (pathname === '/getUnitsInfo') {
																			getUnitsInfo(pathname, client, response, request);
																		} else {
																			if (pathname === '/getweather') {
																				getweather(pathname, client, response, request);
																			} else {
																				if (pathname === '/getUnitSensorInformation') {
																					getUnitSensorInformation(pathname, client, response, request);
																				} else {
																					if (pathname === '/getHistory') {
																						getHistory(pathname, client, response, request);
																					} else {
																						if (pathname === '/getScheduleData') {
																							getScheduleData(pathname, client, response, request);
																						} else {
																							if (pathname === '/getUnitZones') {
																								getUnitZones(pathname, client, response, request);
																							} else {
																								if (pathname === '/getSensorSettings') {
																									getSensorSettings(pathname, client, response, request);
																								} else {
																									if (pathname === '/getZonesData') {
																										getZonesData(pathname, client, response, request);
																									} else {
																										if (pathname === '/linkSensorToZone') {
																											linkSensorToZone(pathname, client, response, request);
																										} else {
																											if (pathname === '/DeleteSensor') {
																												DeleteSensor(pathname, client, response, request);
																											} else {
																												if (pathname === '/DeleteUnit') {
																													DeleteUnit(pathname, client, response, request);
																												} else {
																													if (pathname === '/CreateZone') {
																														CreateZone(pathname, client, response, request);
																													} else {
																														if (pathname === '/SensorTxInformation') {
																															SensorTxInformation(pathname, client, response, request);
																														} else {
																															if (pathname === '/SensorRxschedule') {
																																SensorRxschedule(pathname, client, response, request);
																															} else {
																																if (pathname === '/ControllerRxschedule') {
																																	ControllerRxschedule(pathname, client, response, request);
																																} else {
																																	if (pathname === '/ControllerRxirrigate') {
																																		ControllerRxirrigate(pathname, client, response, request);
																																	} else {
																																		if (pathname === '/CreateSchedule') {
																																			CreateSchedule(pathname, client, response, request);
																																		} else {
																																			if (pathname === '/getSoiltype') {
																																				getSoiltype(pathname, client, response, request);
																																			} else {
																																				if (pathname === '/getSystemtype') {
																																					getSystemtype(pathname, client, response, request);
																																				} else {
																																					if (pathname === '/getGrasstype') {
																																						getGrasstype(pathname, client, response, request);
																																					} else {
																																						if (pathname === '/getSoilgrasssystemdata') {
																																							getSoilgrasssystemdata(pathname, client, response, request);
																																						} else {
																																							if (pathname === '/insertHistory') {
																																								insertHistory(pathname, client, response, request);
																																							} else {
																																								if (pathname === '/UpdateZone') {
																																									UpdateZone(pathname, client, response, request);
																																								} else {
																																									if (pathname === '/Forgotpassword') {
																																										Forgotpassword(pathname, client, response, request);
																																									} else {
																																										if (pathname === '/UnlinkZone') {
																																											UnlinkZone(pathname, client, response, request);
																																										} else {
																																											if (pathname === '/DeleteScheduleRecurrence') {
																																												DeleteScheduleRecurrence(pathname, client, response, request);
																																											} else {
																																												if (pathname === '/DeleteSchedule') {
																																													DeleteSchedule(pathname, client, response, request);
																																												} else {
																																													if (pathname === '/PlaySchedule') {
																																														PlaySchedule(pathname, client, response, request);
																																													} else {
																																														if (pathname === '/PauseSchedule') {
																																															PauseSchedule(pathname, client, response, request);
																																														} else {
																																															if (pathname === '/EditRecurrenceSchedule') {
																																																EditRecurrenceSchedule(pathname, client, response, request);
																																															} else {	
																																																if (pathname === '/EditSchedule') {
																																																	EditSchedule(pathname, client, response, request);
																																																} else {
																																																	if (pathname === '/CreateRecurrency') {
																																																		CreateRecurrency(pathname, client, response, request);
																																																	} else {
																																																		if (pathname === '/PlayZone') {
																																																			PlayZone(pathname, client, response, request);
																																																		} else {
																																																			if (pathname === '/getRecurrency') {
																																																				getRecurrency(pathname, client, response, request);
																																																			} else {
																																																				console.log("No se encontro manipulador para " + pathname);
																																																				response.writeHead(404, "Wrong Path", {'Content-Type': 'application/json'});
																																																				response.end("404 Path No Encontrado, No se encontro manipulador para " + pathname);
																																																				client.end();
																																																			}
																																																		}
																																																	}
																																																}
																																															}
																																														}	
																																													}
																																												}
																																											}
																																										}
																																									}	
																																								}
																																							}
																																						}
																																					}
																																				}
																																			}	
																																		}
																																	}
																																}
																															}
																														}
																													}	
																												}
																											}	
																										}
																									}	
																								}	
																							}
																						}
																					}
																				}	
																			}	
																		}	
																	}	
																}	
															}	
														}	
													}
												}		
											}
										}
									}
								}
							}
						}
					}
				}
			}
		}
	console.log('Sesion Terminada');
  }

  http.createServer(onRequest).listen(8889);
  console.log("Servidor Iniciado.");
 
//
//
//					PANTALLA LOGIN
//
// 
//
function login(pathname, client, response, request){

		//Example of message to be sent http://localhost:8889/login
		// Arguments: email="email" & password="password" 
		// Response: token & onetimelogin & iduser
		
		client.connect();


		if (request.method == 'POST') {
			console.log("[200] " + request.method + " to " + request.url);
			var fullBody = '';
			
			
			request.on('data', function(chunk) {
			    fullBody += chunk.toString();
				
			});
			
			request.on('end', function() {
			
			 
			  
			  // parse the received body data

				
			  var decodedBody = querystring.parse(fullBody);	
			  var mail = querystring.parse(fullBody)['email'];
			  var password = querystring.parse(fullBody)['password'];


			
				//VERIFICACION DE LAS VARIABLES
				if (!mail || !password){
					
					response.writeHead(400, "Bad Request", {'Content-Type': 'application/json'});
					response.end('{ "description":"missing parameters" }');
					
				} else {
		 
					  // output the decoded data to the HTTP response          
					  //response.write('<html><head><title>Post data</title></head><body><pre>');
					  //response.write(password);
					  //response.write('</pre></body></html>');
					  //response.end();
					  
					  
						var rollback = function(client) {
							client.query('ROLLBACK', function() {
							response.writeHead(500, "Query Error", {'Content-Type': 'application/json'});
							response.end('{ "description":"Query Error." }');
							client.end();
							});
							
						};
						var rollback1 = function(client) {
							client.query('ROLLBACK', function() {
							response.writeHead(401, "Unauthorized", {'Content-Type': 'application/json'});
							response.end('{ "description":"User or Password invalid." }');
							client.end();
							});
							
						};
						
						client.query('BEGIN', function(err, results) {
							if(err) return rollback(client);
							
							// OBTENGO LOS DATOS DEL USER
							client.query('SELECT  u.iduser, u.onetimelogin,  st.expirationdate, st.token FROM   users u,  sessiontoken st WHERE u.email = \'' + mail + '\'  AND u.password = \'' + password + '\'  AND u.idUser = st.idUser  ', function (err, results) {
								if(err) return rollback(client);
								
								// CHEQUEO SI EL USUARIO EXISTE
								
								if(results.rowCount == "0") return rollback1(client);
									
								
								//OBTENGO LOS VALORES DE LA QUERY
								
								var  onetimelogin = JSON.stringify(results.rows[0]["onetimelogin"]);
								var  iduser = JSON.stringify(results.rows[0]["iduser"]);
								var  expirationdate = JSON.stringify(results.rows[0]["expirationdate"]);
								var  tokendatabase = JSON.stringify(results.rows[0]["token"]);
								
								// VERIFICO SI EL TOKEN NO EXPIRO
								
								var today = (moment(Date.now()).format('YYYY-MM-DD'));
								var newformatexpirationdate = expirationdate.replace(/T/, ' ').replace(/"/, '').replace(/\..+/, '');

									if (newformatexpirationdate < today ) {
										//GENERO UN NUEVO TOKEN
										var buf = crypto.randomBytes(12)	
										var newtoken = buf.toString('hex')
										var newexpirationdate = moment(today).add(1, 'M').format('YYYY-MM-DD')
										client.query('UPDATE sessiontoken  SET token = \'' + newtoken + '\', expirationdate = \'' + newexpirationdate + '\' WHERE iduser = \'' + iduser + '\'', function (err, results) {
											if(err) return rollback(client);
											client.query('COMMIT', client.end.bind(client));
											response.writeHead(200, "OK", {'Content-Type': 'application/json'});
											response.end('{ "onetimelogin" :  '+ onetimelogin +', "iduser" : ' + iduser + ' , "token" : "' + newtoken + '" }');
							
										});
																							
									} else {
									
										client.query('COMMIT', client.end.bind(client));
										response.writeHead(200, "OK", {'Content-Type': 'application/json'});
										response.end('{  "onetimelogin" :  '+ onetimelogin +', "iduser" : ' + iduser + ' , "token" : ' + tokendatabase + ' }');
									}	
								
							});	
						});
					}
			});
				
				
		  } else {
			console.log("[405] " + request.method + " to " + request.url);
			response.writeHead(405, "Method not supported", {'Content-Type': 'application/json'});
			response.end('<html><head><title>405 - Method not supported</title></head><body><h1>Method not supported.</h1></body></html>');
		  }
		  
		

		
}
function Forgotpassword(pathname, client, response, request){
		//Example of message to be sent (http://localhost:8889/Forgotpassword
		// Arguments: email 
		// Response: 200 ok

		
		client.connect();
		
		if (request.method == 'POST') {
			console.log("[200] " + request.method + " to " + request.url);
			var fullBody = '';
			
			request.on('data', function(chunk) {
			    fullBody += chunk.toString();
			});
			
			request.on('end', function() {
			
			 
			  
			// parse the received body data
				var decodedBody = querystring.parse(fullBody);
				var email = querystring.parse(fullBody)["email"];
				
				
			//VERIFICACION DE LAS VARIABLES
			
					if (!email  ){
						
						response.writeHead(400, "Bad Request", {'Content-Type': 'application/json'});
						response.end('{ "description":"missing parameters" }');
						
					} else {
						//REALIZO LAS QUERY
						
						var rollback = function(client) {
							client.query('ROLLBACK', function() {
							response.writeHead(500, "Query Error", {'Content-Type': 'application/json'});
							response.end('{ "description":"Query Error." }');
							client.end();
							});
						};
						var rollback1 = function(client) {
							client.query('ROLLBACK', function() {
							response.writeHead(400, "Bad Request", {'Content-Type': 'application/json'});
							response.end('{ "description":"wrong parameters" }');
							client.end();
							});
						};
						
						client.query('BEGIN', function(err, results) {
							if(err) return rollback(client);	
							client.query('SELECT * FROM users where email = \'' + email + '\'', function (err, results) {
							if(err) return rollback1(client);
							
							// CHEQUEO SI EL USUARIO EXISTE
							if(results.rowCount == "0") return rollback1(client);
								//GENERO LA PASSWORD
								var clave = gen.sendmail(email);
								
								client.query('UPDATE users SET "password" = \'' + clave + '\', "onetimelogin" =  \'TRUE\'  WHERE email = \'' + email + '\'', function (err, results) {
								if(err) return rollback(client);
								console.log(results);
								
									
										
										client.query('COMMIT', client.end.bind(client));
										response.writeHead(200, "OK", {'Content-Type': 'application/json'});
										response.end('');
										
								
								});
							});	
						});
					}
			});
				
				
		} else {
			console.log("[405] " + request.method + " to " + request.url);
			response.writeHead(405, "Method not supported", {'Content-Type': 'application/json'});
			response.end('<html><head><title>405 - Method not supported</title></head><body><h1>Method not supported.</h1></body></html>');
		}
}


//
//
//					PANTALLA Sign Up
//
// 

function getWaterProviders(pathname, client, response, request){
		//Example (http://localhost:8889/getWaterProviders
		// Arguments: token
		// Response: waterproviders
		
		client.connect();
		
		if (request.method == 'POST') {
			console.log("[200] " + request.method + " to " + request.url);
			var fullBody = '';
			
			request.on('data', function(chunk) {
			    fullBody += chunk.toString();
			});
			
			request.on('end', function() {
			
			 
			  
			  // parse the received body data
			  var decodedBody = querystring.parse(fullBody);
			  var token = querystring.parse(fullBody)['token'];
			  
			
				//VERIFICACION DE LAS VARIABLES
				if (!token){
					
					response.writeHead(400, "Bad Request", {'Content-Type': 'application/json'});
					response.end('{ "description":"missing parameters" }');
					
				} else {
				
					var query = client.query('SELECT wp.alias, wp.idwaterprovider FROM WaterProvider wp, sessiontoken s WHERE s.token = \'' + token + '\'');
					query.on("row", function (row, results) {
						results.addRow(row);
					});
					query.on("end", function (results) {
						if(results.rowCount === 0) {
							response.writeHead(400, "Bad Request", {'Content-Type': 'application/json'});
							response.end('{ "description":"wrong parameters" }');
							client.end();
						} else {
							console.log(JSON.stringify(results.rows, null, "    "));
							response.writeHead(200, "OK", {'Content-Type': 'application/json'});
							response.end("{\"WaterProviders\":" + JSON.stringify(results.rows, null, "    ") + "}");
							client.end();
						}
					});
				}
			});
		} else {
			console.log("[405] " + request.method + " to " + request.url);
			response.writeHead(405, "Method not supported", {'Content-Type': 'application/json'});
			response.end('<html><head><title>405 - Method not supported</title></head><body><h1>Method not supported.</h1></body></html>');
		}
		  
}

function signup(pathname, client, response, request){
		//Example of message to be sent http://localhost:8889/singup
		// Arguments: email, firstname, lastname, password, metrcsystem, timezone 
		// Response: token
		
		client.connect();
		
		if (request.method == 'POST') {
			console.log("[200] " + request.method + " to " + request.url);
			var fullBody = '';
			
			request.on('data', function(chunk) {
			    fullBody += chunk.toString();
			});
			
			request.on('end', function() {
			
			 
			  
			  // parse the received body data
			  var decodedBody = querystring.parse(fullBody);

			
			  var email = querystring.parse(fullBody)["email"];
			  var firstname = querystring.parse(fullBody)["firstname"];
			  var lastname = querystring.parse(fullBody)["lastname"];
			  var password = querystring.parse(fullBody)["password"];
			  var metricsystem = querystring.parse(fullBody)["metricsystem"];
			  var timezone = querystring.parse(fullBody)["timezone"];

		
			   //VERIFICACION DE LAS VARIABLES
					if (!email || !firstname || !lastname || !password  || !metricsystem || !timezone  ){
						
						response.writeHead(400, "Bad Request", {'Content-Type': 'application/json'});
						response.end('{ "description":"missing parameters" }');
						
					} else {
					
						var rollback = function(client) {
							client.query('ROLLBACK', function() {
							response.writeHead(500, "Query Error", {'Content-Type': 'application/json'});
							response.end('{ "description":"Query Error." }');
							client.end();
											});
						};
						var rollback1 = function(client) {
							client.query('ROLLBACK', function() {
							response.writeHead(400, "Query Error", {'Content-Type': 'application/json'});
							response.end('{ "description":"Email already in use" }');
							client.end();
											});
						};
						
						client.query('BEGIN', function(err, results) {
							if(err) return rollback(client);	
							client.query('SELECT  iduser FROM   users  WHERE email = \'' + email + '\'', function (err, results) {
							if(err) return rollback(client);
							// CHEQUEO SI EL USUARIO EXISTE
							if(results.rowCount != "0") return rollback1(client);
							
								client.query('INSERT INTO users (email, firstName, lastName, password, timeZone, metricSystem) VALUES (\'' + email + '\', \'' + firstname + '\', \'' + lastname + '\', \'' + password + '\', \'' + timezone + '\', \'' + metricsystem + '\') RETURNING idUser', function (err, results) {
								if(err) return rollback(client);
								var iduser = results.rows[0].iduser;
								
									
									//GENERO EL TOKEN NUEVO
									var today = (moment(Date.now()).format('YYYY-MM-DD'));
									var buf = crypto.randomBytes(12)	
									var newtoken = buf.toString('hex')
									var newexpirationdate = moment(today).add(1, 'M').format('YYYY-MM-DD')
									client.query('INSERT INTO sessiontoken (iduser, expirationdate, token) VALUES (\'' + iduser + '\', \'' + newexpirationdate + '\', \'' + newtoken + '\')', function (err, results) {
										client.query('COMMIT', client.end.bind(client));
										response.writeHead(200, "OK", {'Content-Type': 'application/json'});
										response.end('{"token" : "' + newtoken + '"}');
									
									});
								});
							});	
						});
					}
			});
				
				
		} else {
			console.log("[405] " + request.method + " to " + request.url);
			response.writeHead(405, "Method not supported", {'Content-Type': 'application/json'});
			response.end('<html><head><title>405 - Method not supported</title></head><body><h1>Method not supported.</h1></body></html>');
		}

}
function insertUnitProvider(pathname, client, response, request){
		// HAGO LA VERIFICACION DEL TOKEN? VALE LA PENA HACER UNA QUERY MAS EN LA BASE DE DATOS Y AGREGAR LATENCIA?
		//Example of message to be sent (http://localhost:8889/insertUnitProvider
		// Arguments: idunit, price, idwaterprovider, token
		// Response: 
		
		client.connect();
		
		if (request.method == 'POST') {
			console.log("[200] " + request.method + " to " + request.url);
			var fullBody = '';
			
			request.on('data', function(chunk) {
			    fullBody += chunk.toString();
			});
			
			request.on('end', function() {
			
			 
			  
			  // parse the received body data
				var decodedBody = querystring.parse(fullBody);
				var idunit = querystring.parse(fullBody)["idunit"];
				var price = querystring.parse(fullBody)["price"];
				var idwaterprovider = querystring.parse(fullBody)["idwaterprovider"];
				var token = querystring.parse(fullBody)["token"];
				
			   //VERIFICACION DE LAS VARIABLES
					if (!idunit || !price || !idwaterprovider || !token){
						
						response.writeHead(400, "Bad Request", {'Content-Type': 'application/json'});
						response.end('{ "description":"missing parameters" }');
						
					} else {
						var query = client.query('INSERT INTO UnitProvider (idUnit, idWaterProvider, price, startDate) VALUES (\''+ idunit +'\', \''+ idwaterprovider +'\', \''+ price +'\', localtimestamp(1))', function(err, results) {
							if(err) {
								response.writeHead(500, "Query Error", {'Content-Type': 'application/json'});
								response.end('{ "description":"Query Error." }');
								client.end();
							} else {
								response.writeHead(200, "OK", {'Content-Type': 'application/json'});
								response.end('');
								client.end();
								}
						});
					}
			});
				
				
		} else {
			console.log("[405] " + request.method + " to " + request.url);
			response.writeHead(405, "Method not supported", {'Content-Type': 'application/json'});
			response.end('<html><head><title>405 - Method not supported</title></head><body><h1>Method not supported.</h1></body></html>');
		}
}
function insertUnit(pathname, client, response, request){
		//Example of message to be sent (http://localhost:8889/inserUnit
		// Arguments: unitalias, zipcode, unitidentifier, token
		// Response: idunit

		
		client.connect();
		
		if (request.method == 'POST') {
			console.log("[200] " + request.method + " to " + request.url);
			var fullBody = '';
			
			request.on('data', function(chunk) {
			    fullBody += chunk.toString();
			});
			
			request.on('end', function() {
			
			 
			  
			// parse the received body data
				var decodedBody = querystring.parse(fullBody);
				var unitalias = querystring.parse(fullBody)["unitalias"];
				var zipcode = querystring.parse(fullBody)["zipcode"];
				var unitidentifier = querystring.parse(fullBody)["unitidentifier"];
				var token = querystring.parse(fullBody)["token"];
				
			//VERIFICACION DE LAS VARIABLES
					if (!unitalias || !zipcode || !unitidentifier || !token){
						
						response.writeHead(400, "Bad Request", {'Content-Type': 'application/json'});
						response.end('{ "description":"missing parameters" }');
						
					} else {
						//REALIZO LAS QUERY
						var rollback = function(client) {
							client.query('ROLLBACK', function() {
							response.writeHead(500, "Query Error", {'Content-Type': 'application/json'});
							response.end('{ "description":"Query Error." }');
							client.end();
							});
						};
						var rollback1 = function(client) {
							client.query('ROLLBACK', function() {
							
							response.writeHead(400, "Bad Request", {'Content-Type': 'application/json'});
							response.end('{ "description":"wrong parameters" }');
							client.end();
							});
						};
							var rollback2 = function(client) {
							client.query('ROLLBACK', function() {
							
							response.writeHead(500, "Bad Request", {'Content-Type': 'application/json'});
							response.end('{ "description":"Unitidentifier already exist" }');
							client.end();
							});
						};
						
						client.query('BEGIN', function(err, results) {
							if(err) return rollback(client);
							client.query('SELECT unitidentifier from unit WHERE unitidentifier = \''+ unitidentifier +'\'', function (err, results) {
									if(results.rowCount != "0") return rollback2(client);
																
								client.query('INSERT INTO unit (alias, zipCode, unitIdentifier)  VALUES (\''+ unitalias +'\', \''+ zipcode +'\', \''+ unitidentifier +'\') RETURNING idUnit', function (err, results) {
									if(err) return rollback(client);
									var idunit = results.rows[0].idunit;
									client.query('SELECT iduser FROM sessiontoken  WHERE  localtimestamp(0) < expirationdate AND token =  \'' + token + '\'', function (err, results) {
									if(err) return rollback1(client);
								
									// CHEQUEO SI EL USUARIO EXISTE
									
									if(results.rowCount == "0") return rollback1(client);
									
									var iduser = results.rows[0].iduser;
										client.query('INSERT INTO UserUnits (idUser, idUnit) VALUES (\'' + iduser + '\', \'' + idunit + '\')', function (err, results) {
											//console.log(err);
											if(err) return rollback(client);
											client.query('COMMIT', client.end.bind(client));
											response.writeHead(200, "OK", {'Content-Type': 'application/json'});
											response.end('{"idunit" : ' + idunit + '}');
											
										});
									});
								});
							});					
						});
					}
			});
				
				
		} else {
			console.log("[405] " + request.method + " to " + request.url);
			response.writeHead(405, "Method not supported", {'Content-Type': 'application/json'});
			response.end('<html><head><title>405 - Method not supported</title></head><body><h1>Method not supported.</h1></body></html>');
		}
}

function updateUnit(pathname, client, response, request){
		//Example of message to be sent (http://localhost:8889/updateUnit
		// Arguments: alias, zipcode, unitidentifier, token, idunit
		// Response: 
		
		client.connect();	
		
		if (request.method == 'POST') {
			console.log("[200] " + request.method + " to " + request.url);
			var fullBody = '';
			
			request.on('data', function(chunk) {
			    fullBody += chunk.toString();
			});
			
			request.on('end', function() {
			
			 
			  
			// parse the received body data
				var decodedBody = querystring.parse(fullBody);
				var unitidentifier = querystring.parse(fullBody)["unitidentifier"];
				var alias = querystring.parse(fullBody)["alias"];
				var zipcode = querystring.parse(fullBody)["zipcode"];
				var idunit = querystring.parse(fullBody)["idunit"];
				var token = querystring.parse(fullBody)["token"];
				
			//VERIFICACION DE LAS VARIABLES
					if (!alias || !zipcode || !unitidentifier || !token || !idunit){
						
						response.writeHead(400, "Bad Request", {'Content-Type': 'application/json'});
						response.end('{ "description":"missing parameters" }');
						
					} else {
						var rollback1 = function(client) {
							client.query('ROLLBACK', function() {
							response.writeHead(400, "Bad Request", {'Content-Type': 'application/json'});
							response.end('{ "description":"wrong parameters" }');
							client.end();
							});
						};
						var rollback = function(client) {
							client.query('ROLLBACK', function() {
							response.writeHead(500, "Query Error", {'Content-Type': 'application/json'});
							response.end('{ "description":"Query Error." }');
							client.end();
							});
						};

						
						client.query('BEGIN', function(err, results) {
							if(err) return rollback(client);	
							client.query('SELECT iduser FROM sessiontoken  WHERE  localtimestamp(0) < expirationdate AND token =  \'' + token + '\'', function (err, results) {
								if(err) return rollback1(client);
								
								// CHEQUEO SI EL USUARIO EXISTE
								if(results.rowCount == "0") return rollback1(client);
								var iduser = results.rows[0].iduser;
								
								client.query('UPDATE unit  SET alias = \'' + alias + '\', zipcode = \'' + zipcode + '\', unitIdentifier = \'' + unitidentifier + '\' WHERE idUnit = \'' + idunit + '\'', function (err, results) {
								
								if(err) return rollback(client);
								
									
										
										client.query('COMMIT', client.end.bind(client));
										response.writeHead(200, "OK", {'Content-Type': 'application/json'});
										response.end('');
										
								
								});
							});	
						});
						

					}
			});
				
				
		} else {
			console.log("[405] " + request.method + " to " + request.url);
			response.writeHead(405, "Method not supported", {'Content-Type': 'application/json'});
			response.end('<html><head><title>405 - Method not supported</title></head><body><h1>Method not supported.</h1></body></html>');
		}
}
function insertSensor(pathname, client, response, request){
		//Example of message to be sent (http://localhost:8889/insertSensor
		// Arguments: sensoridentifier, alias, idunit, token
		// Response: idsensor

		
		client.connect();
		
		if (request.method == 'POST') {
			console.log("[200] " + request.method + " to " + request.url);
			var fullBody = '';
			
			request.on('data', function(chunk) {
			    fullBody += chunk.toString();
			});
			
			request.on('end', function() {
			
			 
			  
			// parse the received body data
				var decodedBody = querystring.parse(fullBody);
				var idunit = querystring.parse(fullBody)["idunit"];
				var alias = querystring.parse(fullBody)["alias"];
				var sensoridentifier = querystring.parse(fullBody)["sensoridentifier"];
				var token = querystring.parse(fullBody)["token"];
				
			//VERIFICACION DE LAS VARIABLES
			
					if (!idunit || !alias || !sensoridentifier || !token){
						
						response.writeHead(400, "Bad Request", {'Content-Type': 'application/json'});
						response.end('{ "description":"missing parameters" }');
						
					} else {
						//REALIZO LAS QUERY
						
						var rollback = function(client) {
							client.query('ROLLBACK', function() {
							response.writeHead(500, "Query Error", {'Content-Type': 'application/json'});
							response.end('{ "description":"Query Error." }');
							client.end();
							});
						};
						var rollback1 = function(client) {
							client.query('ROLLBACK', function() {
							response.writeHead(400, "Bad Request", {'Content-Type': 'application/json'});
							response.end('{ "description":"wrong parameters" }');
							client.end();
							});
						};
						var rollback2 = function(client) {
							client.query('ROLLBACK', function() {
							
							response.writeHead(500, "Bad Request", {'Content-Type': 'application/json'});
							response.end('{ "description":"Sensoridentifier already exist" }');
							client.end();
							});
						};
						client.query('BEGIN', function(err, results) {
							if(err) return rollback(client);	
							
							client.query('SELECT * FROM sessiontoken  WHERE  localtimestamp(0) < expirationdate AND token = \'' + token + '\'', function (err, results) {
							if(err) return rollback1(client);
							
							// CHEQUEO SI EL USUARIO EXISTE
							if(results.rowCount == "0") return rollback1(client);
							// CHEQUEO SI EL SENSORIDENTIFIER YA ESTA SIENDO USADO
								client.query('SELECT sensoridentifier from sensor WHERE sensoridentifier = \''+ sensoridentifier +'\'', function (err, results) {
									if(results.rowCount != "0") return rollback2(client);
									client.query('INSERT INTO sensor (idunit, alias, sensoridentifier) VALUES (\'' + idunit + '\', \'' + alias + '\', \'' + sensoridentifier + '\') RETURNING idsensor', function (err, results) {
									if(err) return rollback(client);
									
									var idsensor = results.rows[0].idsensor;
										
											
											client.query('COMMIT', client.end.bind(client));
											response.writeHead(200, "OK", {'Content-Type': 'application/json'});
											response.end('{"idsensor" : ' + idsensor + '}');
											
									});
								});
							});	
						});
					}
			});
				
				
		} else {
			console.log("[405] " + request.method + " to " + request.url);
			response.writeHead(405, "Method not supported", {'Content-Type': 'application/json'});
			response.end('<html><head><title>405 - Method not supported</title></head><body><h1>Method not supported.</h1></body></html>');
		}
}
function updateSensor(pathname, client, response, request){
		// http://localhost:8889/updateSensor
		// Arguments: sensoridentifier, alias, idunit, token, idgrasstype, idsoiltype, idsystemtype
		// Response: idsensor
		
		client.connect();	
		
		if (request.method == 'POST') {
			console.log("[200] " + request.method + " to " + request.url);
			var fullBody = '';
			
			request.on('data', function(chunk) {
			    fullBody += chunk.toString();
			});
			
			request.on('end', function() {
			
			 
			  
			// parse the received body data
				var decodedBody = querystring.parse(fullBody);		
				var idsensor = querystring.parse(fullBody)["idsensor"];
				var alias = querystring.parse(fullBody)["alias"];
				var idunit = querystring.parse(fullBody)["idunit"];
				var idgrasstype = querystring.parse(fullBody)["idgrasstype"];
				var idsoiltype = querystring.parse(fullBody)["idsoiltype"];
				var idsystemtype = querystring.parse(fullBody)["idsystemtype"];
				var sensoridentifier = querystring.parse(fullBody)["sensoridentifier"];
				var token = querystring.parse(fullBody)["token"];
				
				//VERIFICACION DE LAS VARIABLES	
				
					if (!idunit || !alias || !idsensor || !token || !idgrasstype || !idsoiltype || !idsystemtype || !sensoridentifier){
						
						response.writeHead(400, "Bad Request", {'Content-Type': 'application/json'});
						response.end('{ "description":"missing parameters" }');
						
					} else {
					
						//REALIZO LAS QUERY
						var rollback1 = function(client) {
							client.query('ROLLBACK', function() {
							response.writeHead(400, "Bad Request", {'Content-Type': 'application/json'});
							response.end('{ "description":"wrong parameters" }');
							client.end();
							});
						};
						var rollback = function(client) {
							client.query('ROLLBACK', function() {
							response.writeHead(500, "Query Error", {'Content-Type': 'application/json'});
							response.end('{ "description":"Query Error." }');
							client.end();
							});
						};

						
						client.query('BEGIN', function(err, results) {
							if(err) return rollback(client);	
							client.query('SELECT iduser FROM sessiontoken  WHERE  localtimestamp(0) < expirationdate AND token =  \'' + token + '\'', function (err, results) {
								if(err) return rollback1(client);
								
								// CHEQUEO SI EL USUARIO EXISTE
								if(results.rowCount == "0") return rollback1(client);
								var iduser = results.rows[0].iduser;
								
								client.query('UPDATE "sensor" SET "alias" =\'' + alias + '\', "idunit" =\'' + idunit + '\', "idgrasstype" =\'' + idgrasstype + '\', "idsoiltype" =\'' + idsoiltype + '\', "idsystemtype" =\'' + idsystemtype + '\', "sensoridentifier" =\'' + sensoridentifier + '\' WHERE "idsensor" = \'' + idsensor + '\'' , function (err, results) {
								if(err) return rollback(client);
								
									
										
										client.query('COMMIT', client.end.bind(client));
										response.writeHead(200, "OK", {'Content-Type': 'application/json'});
										response.end('');
										
								
								});
							});	
						});
						

					}
			});
				
				
		} else {
			console.log("[405] " + request.method + " to " + request.url);
			response.writeHead(405, "Method not supported", {'Content-Type': 'application/json'});
			response.end('<html><head><title>405 - Method not supported</title></head><body><h1>Method not supported.</h1></body></html>');
		}

}

//
//
//					PANTALLA PROFILE
//
// 

function getProfileUserData(pathname, client, response, request){
		//Example of message to be sent (http://localhost:8889/getProfileUserData
		// Arguments:  token
		// Response: Users info
		
		client.connect();
		
		if (request.method == 'POST') {
			console.log("[200] " + request.method + " to " + request.url);
			var fullBody = '';
			
			request.on('data', function(chunk) {
			    fullBody += chunk.toString();
			});
			
			request.on('end', function() {
			
			 
			  
			// parse the received body data
				var decodedBody = querystring.parse(fullBody);			
				var token = querystring.parse(fullBody)["token"];
				
				
				//VERIFICACION DE LAS VARIABLES		
				
				if (!token ){
						
						response.writeHead(400, "Bad Request", {'Content-Type': 'application/json'});
						response.end('{ "description":"missing parameters" }');
						
					} else {
					
						//REALIZO LAS QUERY
						var rollback1 = function(client) {
							client.query('ROLLBACK', function() {
							response.writeHead(400, "Bad Request", {'Content-Type': 'application/json'});
							response.end('{ "description":"wrong parameters" }');
							client.end();
							});
						};
						var rollback = function(client) {
							client.query('ROLLBACK', function() {
							response.writeHead(500, "Query Error", {'Content-Type': 'application/json'});
							response.end('{ "description":"Query Error." }');
							client.end();
							});
						};
						client.query('BEGIN', function(err, results) {
							if(err) return rollback(client);	
							client.query('SELECT iduser FROM sessiontoken  WHERE  localtimestamp(0) < expirationdate AND token =  \'' + token + '\'', function (err, results) {
								if(err) return rollback1(client);
								
								// CHEQUEO SI EL USUARIO EXISTE
								if(results.rowCount == "0") return rollback1(client);
								var iduser = results.rows[0].iduser;
								
								client.query('SELECT * FROM users WHERE iduser = \'' + iduser + '\'' , function (err, results) {
								if(err) return rollback(client);
								
									
										
										client.query('COMMIT', client.end.bind(client));
										response.writeHead(200, "OK", {'Content-Type': 'application/json'});
										response.end( JSON.stringify(results.rows, null, "    ") );
																	
								});
							});	
						});
						

					}
			});
				
				
		} else {
			console.log("[405] " + request.method + " to " + request.url);
			response.writeHead(405, "Method not supported", {'Content-Type': 'application/json'});
			response.end('<html><head><title>405 - Method not supported</title></head><body><h1>Method not supported.</h1></body></html>');
		}
}
function getProfileUnitData(pathname, client, response, request){
		//Example of message to be sent (http://localhost:8889/getProfileUnitData
		// Arguments:  token
		// Response: Unit info
		
		client.connect();
		if (request.method == 'POST') {
			console.log("[200] " + request.method + " to " + request.url);
			var fullBody = '';
			
			request.on('data', function(chunk) {
			    fullBody += chunk.toString();
			});
			
			request.on('end', function() {
			
			 
			  
			// parse the received body data
				var decodedBody = querystring.parse(fullBody);			
				var token = querystring.parse(fullBody)["token"];
				
				
				//VERIFICACION DE LAS VARIABLES
				
				if (!token ){
						
						response.writeHead(400, "Bad Request", {'Content-Type': 'application/json'});
						response.end('{ "description":"missing parameters" }');
						
					} else {
					
						//REALIZO LAS QUERY
						var rollback1 = function(client) {
							client.query('ROLLBACK', function() {
							response.writeHead(400, "Bad Request", {'Content-Type': 'application/json'});
							response.end('{ "description":"wrong parameters" }');
							client.end();
							});
						};
						var rollback = function(client) {
							client.query('ROLLBACK', function() {
							response.writeHead(500, "Query Error", {'Content-Type': 'application/json'});
							response.end('{ "description":"Query Error." }');
							client.end();
							});
						};
						client.query('BEGIN', function(err, results) {
							if(err) return rollback(client);	
							client.query('SELECT iduser FROM sessiontoken  WHERE  localtimestamp(0) < expirationdate AND token =  \'' + token + '\'', function (err, results) {
								if(err) return rollback1(client);
								
								// CHEQUEO SI EL USUARIO EXISTE
								if(results.rowCount == "0") return rollback1(client);
								var iduser = results.rows[0].iduser;
								
								client.query('SELECT  ut.zipCode as unitZipcode,  ut.idUnit as idUnit,  ut.alias as UnitAlias,  ut.unitIdentifier as UnitIdentifier  FROM   UserUnits uu, Unit ut  WHERE uu.idUser = \'' + iduser + '\'  AND uu.idUnit = ut.idUnit order by ut.idUnit asc' , function (err, results) {
								if(err) return rollback(client);
								
									
										
										client.query('COMMIT', client.end.bind(client));
										response.writeHead(200, "OK", {'Content-Type': 'application/json'});
										response.end( JSON.stringify(results.rows, null, "    ") );
																	
								});
							});	
						});
						

					}
			});
				
				
		} else {
			console.log("[405] " + request.method + " to " + request.url);
			response.writeHead(405, "Method not supported", {'Content-Type': 'application/json'});
			response.end('<html><head><title>405 - Method not supported</title></head><body><h1>Method not supported.</h1></body></html>');
		}
}
function getProfileSensorData(pathname, client, response, request){
		//Example of message to be sent (http://localhost:8889/getProfileSensorData
		// Arguments: idunit and token
		// Response: Sensor info
		
		client.connect();

		if (request.method == 'POST') {
			console.log("[200] " + request.method + " to " + request.url);
			var fullBody = '';
			
			request.on('data', function(chunk) {
			    fullBody += chunk.toString();
			});
			
			request.on('end', function() {
			
			 
			  
			// parse the received body data
				var decodedBody = querystring.parse(fullBody);			
				var token = querystring.parse(fullBody)["token"];
				var idunit = querystring.parse(fullBody)["idunit"];

				//VERIFICACION DE LAS VARIABLES
				
				if (!idunit || !token ){
						
						response.writeHead(400, "Bad Request", {'Content-Type': 'application/json'});
						response.end('{ "description":"missing parameters" }');
						
					} else {
					
						//REALIZO LAS QUERY
						var rollback1 = function(client) {
							client.query('ROLLBACK', function() {
							response.writeHead(400, "Bad Request", {'Content-Type': 'application/json'});
							response.end('{ "description":"wrong parameters" }');
							client.end();
							});
						};
						var rollback = function(client) {
							client.query('ROLLBACK', function() {
							response.writeHead(500, "Query Error", {'Content-Type': 'application/json'});
							response.end('{ "description":"Query Error." }');
							client.end();
							});
						};
						client.query('BEGIN', function(err, results) {
							if(err) return rollback(client);	
							client.query('SELECT iduser FROM sessiontoken  WHERE  localtimestamp(0) < expirationdate AND token =  \'' + token + '\'', function (err, results) {
								if(err) return rollback1(client);
								
								// CHEQUEO SI EL USUARIO EXISTE
								if(results.rowCount == "0") return rollback1(client);
								var iduser = results.rows[0].iduser;
								
								client.query('SELECT s.alias as SensorAlias, s.sensorIdentifier as SensorIdentifier, s.idsensor as idsensor, gt.idGrassType as idGrassType, st.idsoil as idSoilType, syt.idSystemType as idSystemType FROM sensor s, soiltype st, GrassType gt, SystemType syt, Unit ut WHERE ut.idUnit = \'' + idunit + '\' AND s.idUnit = ut.idUnit AND gt.idGrassType = s.idGrassType AND st.idsoil = s.idsoiltype AND syt.idSystemtype = s.idSystemType order by s.idsensor asc' , function (err, results) {
								if(err) return rollback(client);
								
									
										
										client.query('COMMIT', client.end.bind(client));
										response.writeHead(200, "OK", {'Content-Type': 'application/json'});
										response.end(JSON.stringify(results.rows, null, "    "));
																	
								});
							});	
						});
						

					}
			});
				
				
		} else {
			console.log("[405] " + request.method + " to " + request.url);
			response.writeHead(405, "Method not supported", {'Content-Type': 'application/json'});
			response.end('<html><head><title>405 - Method not supported</title></head><body><h1>Method not supported.</h1></body></html>');
		}
}
function updateProfile(pathname, client, response, request){
		//Example of message to be sent (http://localhost:8889/updateProfile
		// Arguments: email firstname lastname metricsystem timezone token
		// Response: Null
		
		client.connect();
		
		if (request.method == 'POST') {
			console.log("[200] " + request.method + " to " + request.url);
			var fullBody = '';
			
			request.on('data', function(chunk) {
			    fullBody += chunk.toString();
			});
			
			request.on('end', function() {
			
			 
			  
			// parse the received body data
				var decodedBody = querystring.parse(fullBody);			
				var token = querystring.parse(fullBody)["token"];
				var firstname = querystring.parse(fullBody)["firstname"];
				var lastname = querystring.parse(fullBody)["lastname"];
				var metricsystem = querystring.parse(fullBody)["metricsystem"];
				var timezone = querystring.parse(fullBody)["timezone"];
				var email = querystring.parse(fullBody)["email"];

				
				//VERIFICACION DE LAS VARIABLES
				
				if (!firstname || !token || !lastname || !metricsystem || !timezone || !email ){
						
						response.writeHead(400, "Bad Request", {'Content-Type': 'application/json'});
						response.end('{ "description":"missing parameters" }');
						
					} else {
					
						//REALIZO LAS QUERY
						var rollback1 = function(client) {
							client.query('ROLLBACK', function() {
							response.writeHead(400, "Bad Request", {'Content-Type': 'application/json'});
							response.end('{ "description":"wrong parameters" }');
							client.end();
							});
						};
						var rollback = function(client) {
							client.query('ROLLBACK', function() {
							response.writeHead(500, "Query Error", {'Content-Type': 'application/json'});
							response.end('{ "description":"Query Error." }');
							client.end();
							});
						};
						client.query('BEGIN', function(err, results) {
							if(err) return rollback(client);	
							client.query('SELECT iduser FROM sessiontoken  WHERE  localtimestamp(0) < expirationdate AND token =  \'' + token + '\'', function (err, results) {
								if(err) return rollback1(client);
								
								// CHEQUEO SI EL USUARIO EXISTE
								if(results.rowCount == "0") return rollback1(client);
								var iduser = results.rows[0].iduser;
								
								client.query('UPDATE "users" SET "email" =\'' + email + '\', "firstname" =\'' + firstname + '\', "lastname" =\'' + lastname + '\', "metricsystem" =\'' + metricsystem +	'\', "timezone" =\'' + timezone + '\' WHERE "iduser" = \'' + iduser + '\'' , function (err, results) {
								if(err) return rollback(client);
								
									
										
										client.query('COMMIT', client.end.bind(client));
										response.writeHead(200, "OK", {'Content-Type': 'application/json'});
										response.end();
																	
								});
							});	
						});
						

					}
			});
				
				
		} else {
			console.log("[405] " + request.method + " to " + request.url);
			response.writeHead(405, "Method not supported", {'Content-Type': 'application/json'});
			response.end('<html><head><title>405 - Method not supported</title></head><body><h1>Method not supported.</h1></body></html>');
		}

}
function updatesecret(pathname, client, response, request){
		//Example of message to be sent (http://localhost:8889/updatesecret
		// Arguments: secret and token
		// Response: Null
		
		client.connect();	
		
		if (request.method == 'POST') {
			console.log("[200] " + request.method + " to " + request.url);
			var fullBody = '';
			
			request.on('data', function(chunk) {
			    fullBody += chunk.toString();
			});
			
			request.on('end', function() {
			
			 
			  
			// parse the received body data
				var decodedBody = querystring.parse(fullBody);	
				var password = querystring.parse(fullBody)["secret"];
				var token = querystring.parse(fullBody)["token"];
				
			//VERIFICACION DE LAS VARIABLES
				
				if (!password || !token ){
						
						response.writeHead(400, "Bad Request", {'Content-Type': 'application/json'});
						response.end('{ "description":"missing parameters" }');
						
					} else {
					
						//REALIZO LAS QUERY
						var rollback1 = function(client) {
							client.query('ROLLBACK', function() {
							response.writeHead(400, "Bad Request", {'Content-Type': 'application/json'});
							response.end('{ "description":"wrong parameters" }');
							client.end();
							});
						};
						var rollback = function(client) {
							client.query('ROLLBACK', function() {
							response.writeHead(500, "Query Error", {'Content-Type': 'application/json'});
							response.end('{ "description":"Query Error." }');
							client.end();
							});
						};
						client.query('BEGIN', function(err, results) {
							if(err) return rollback(client);	
							client.query('SELECT iduser FROM sessiontoken  WHERE  localtimestamp(0) < expirationdate AND token =  \'' + token + '\'', function (err, results) {
								if(err) return rollback1(client);
								
								// CHEQUEO SI EL USUARIO EXISTE
								if(results.rowCount == "0") return rollback1(client);
								var iduser = results.rows[0].iduser;
								
								client.query('UPDATE "users" SET "password" =\'' + password + '\' WHERE "iduser" = \'' + iduser + '\'' , function (err, results) {
								if(err) return rollback(client);
								
									
										
										client.query('COMMIT', client.end.bind(client));
										response.writeHead(200, "OK", {'Content-Type': 'application/json'});
										response.end();
																	
								});
							});	
						});
						

					}
			});
				
				
		} else {
			console.log("[405] " + request.method + " to " + request.url);
			response.writeHead(405, "Method not supported", {'Content-Type': 'application/json'});
			response.end('<html><head><title>405 - Method not supported</title></head><body><h1>Method not supported.</h1></body></html>');
		}

}
function updateUnitProvider(pathname, client, response, request){
		//Example of message to be sent (http://localhost:8889/updateUnitProvider?idunit
		// Arguments: idunit idwaterprovider  price and token
		// Response: Null
		
		client.connect();	
		
		if (request.method == 'POST') {
			console.log("[200] " + request.method + " to " + request.url);
			var fullBody = '';
			
			request.on('data', function(chunk) {
			    fullBody += chunk.toString();
			});
			
			request.on('end', function() {
			
			 
			  
			// parse the received body data
				var decodedBody = querystring.parse(fullBody);			
				var token = querystring.parse(fullBody)["token"];
				var idunit = querystring.parse(fullBody)["idunit"];
				var price = querystring.parse(fullBody)["price"];
				var idwaterprovider = querystring.parse(fullBody)["idwaterprovider"];
				
				if (!idunit || !token || !price || !idwaterprovider ){
						
						response.writeHead(400, "Bad Request", {'Content-Type': 'application/json'});
						response.end('{ "description":"missing parameters" }');
						
					} else {
					
						//REALIZO LAS QUERY
						var rollback1 = function(client) {
							client.query('ROLLBACK', function() {
							response.writeHead(400, "Bad Request", {'Content-Type': 'application/json'});
							response.end('{ "description":"wrong parameters" }');
							client.end();
							});
						};
						var rollback = function(client) {
							client.query('ROLLBACK', function() {
							response.writeHead(500, "Query Error", {'Content-Type': 'application/json'});
							response.end('{ "description":"Query Error." }');
							client.end();
							});
						};
						client.query('BEGIN', function(err, results) {
							if(err) return rollback(client);	
							client.query('SELECT iduser FROM sessiontoken  WHERE  localtimestamp(0) < expirationdate AND token =  \'' + token + '\'', function (err, results) {
								if(err) return rollback1(client);
								
								// CHEQUEO SI EL USUARIO EXISTE
								if(results.rowCount == "0") return rollback1(client);
								var iduser = results.rows[0].iduser;
								
								client.query('SELECT * FROM unitprovider WHERE idunit = \'' + idunit + '\' order by idunitprovider desc LIMIT 1', function (err, results) {
									if(err) return rollback(client);

									var idunitprovider = results.rows[0].idunitprovider;
									
									client.query('UPDATE unitprovider SET enddate = localtimestamp(0) WHERE idunitprovider = \'' + idunitprovider + '\' ', function (err, results) {
										if(err) return rollback(client);
										client.query('INSERT INTO unitprovider (idunit, idwaterprovider, price, startdate) VALUES (\'' + idunit + '\', \'' + idwaterprovider + '\', \'' + price + '\', localtimestamp(0))', function (err, results) {
											
											if(err)	return rollback(client);
												client.query('COMMIT', client.end.bind(client));
												response.writeHead(200, "OK", {'Content-Type': 'application/json'});
												response.end();
						
										});
									});
								});	
							});	
						});
						

					}
			});
				
				
		} else {
			console.log("[405] " + request.method + " to " + request.url);
			response.writeHead(405, "Method not supported", {'Content-Type': 'application/json'});
			response.end('<html><head><title>405 - Method not supported</title></head><body><h1>Method not supported.</h1></body></html>');
		}

}
//
//
//					PANTALLA MAIN
//
//
function getSensorData(pathname, client, response, request){
		//Example of message to be sent (http://localhost:8889/getSensorData?idunit="idunit")
		// Arguments: idunit  token
		// Response: Sensor Data
		client.connect();
		if (request.method == 'POST') {
			console.log("[200] " + request.method + " to " + request.url);
			var fullBody = '';
			
			request.on('data', function(chunk) {
			    fullBody += chunk.toString();
			});
			
			request.on('end', function() {
			
			 
			  
			// parse the received body data
				var decodedBody = querystring.parse(fullBody);			
				var token = querystring.parse(fullBody)["token"];
				var idunit = querystring.parse(fullBody)["idunit"];
				
				var moment = require('moment');
				var date = (moment(Date.now()).format('YYYY-MM-DD'));
				
				if (!idunit || !token ){
						
						response.writeHead(400, "Bad Request", {'Content-Type': 'application/json'});
						response.end('{ "description":"missing parameters" }');
						
					} else {
					
						//REALIZO LAS QUERY
						var rollback1 = function(client) {
							client.query('ROLLBACK', function() {
							response.writeHead(400, "Bad Request", {'Content-Type': 'application/json'});
							response.end('{ "description":"wrong parameters" }');
							client.end();
							});
						};
						var rollback = function(client) {
							client.query('ROLLBACK', function() {
							response.writeHead(500, "Query Error", {'Content-Type': 'application/json'});
							response.end('{ "description":"Query Error." }');
							client.end();
							});
						};
						client.query('BEGIN', function(err, results) {
							if(err) return rollback(client);	
							client.query('SELECT iduser FROM sessiontoken  WHERE  localtimestamp(0) < expirationdate AND token =  \'' + token + '\'', function (err, results) {
								if(err) return rollback1(client);
								
								// CHEQUEO SI EL USUARIO EXISTE
								if(results.rowCount == "0") return rollback1(client);
								var iduser = results.rows[0].iduser;
								
								client.query('SELECT sd.idsensordata as idsensordata, sd.idsensor as idsensor, sd.humidity as humidity, sd.light as light, sd.temperature as temperature, sd.date as date, sd.battery as battery, s.alias as SensorAlias, s.sensoridentifier as sensoridentifier FROM SensorData sd, Sensor s WHERE s.idUnit = \'' + idunit + '\' AND sd.idSensor = s.idSensor AND s.isenable = \'TRUE\' AND sd.date >= \'' + date + '\' order by sd.date desc limit 1' , function (err, results) {
								if(err) return rollback(client);
								
									
										
										client.query('COMMIT', client.end.bind(client));
										response.writeHead(200, "OK", {'Content-Type': 'application/json'});
										response.end( JSON.stringify(results.rows, null, "    "));
																	
								});
							});	
						});
						

					}
			});
				
				
		} else {
			console.log("[405] " + request.method + " to " + request.url);
			response.writeHead(405, "Method not supported", {'Content-Type': 'application/json'});
			response.end('<html><head><title>405 - Method not supported</title></head><body><h1>Method not supported.</h1></body></html>');
		}

}

function getUnitsInfo(pathname, client, response, request){
		//Example of message to be sent (http://localhost:8889/getUnitsInfo
		// Arguments: token
		// Response: Unit info
		
		client.connect();
		if (request.method == 'POST') {
			console.log("[200] " + request.method + " to " + request.url);
			var fullBody = '';
			
			request.on('data', function(chunk) {
			    fullBody += chunk.toString();
			});
			
			request.on('end', function() {
			
			 
			  
			// parse the received body data
				var decodedBody = querystring.parse(fullBody);			
				var token = querystring.parse(fullBody)["token"];
				
				
				//VERIFICACION DE LAS VARIABLES
				
				if ( !token ){
						
						response.writeHead(400, "Bad Request", {'Content-Type': 'application/json'});
						response.end('{ "description":"missing parameters" }');
						
					} else {
					
						//REALIZO LAS QUERY
						var rollback1 = function(client) {
							client.query('ROLLBACK', function() {
							response.writeHead(400, "Bad Request", {'Content-Type': 'application/json'});
							response.end('{ "description":"wrong parameters" }');
							client.end();
							});
						};
						var rollback = function(client) {
							client.query('ROLLBACK', function() {
							response.writeHead(500, "Query Error", {'Content-Type': 'application/json'});
							response.end('{ "description":"Query Error." }');
							client.end();
							});
						};
						client.query('BEGIN', function(err, results) {
							if(err) return rollback(client);	
							client.query('SELECT iduser FROM sessiontoken  WHERE  localtimestamp(0) < expirationdate AND token =  \'' + token + '\'', function (err, results) {
								if(err) return rollback1(client);
								
								// CHEQUEO SI EL USUARIO EXISTE
								if(results.rowCount == "0") return rollback1(client);
								var iduser = results.rows[0].iduser;
								
								client.query('SELECT un.idUnit, un.alias as UnitAlias, un.zipcode as UnitZipcode, wp.alias as WaterproviderAlias, wp.idWaterProvider, un.unitidentifier as unitidentifier, up.price FROM Unit un,  UserUnits uu, UnitProvider up, waterprovider wp WHERE   uu.idUser = ' + iduser + ' AND un.idUnit = uu.idUnit AND up.enddate  is NULL AND up.idUnit = un.idUnit AND wp.idWaterProvider = up.idwaterprovider' , function (err, results) {
								if(err) return rollback(client);
								
									
										
										client.query('COMMIT', client.end.bind(client));
										response.writeHead(200, "OK", {'Content-Type': 'application/json'});
										
										response.end( JSON.stringify(results.rows, null, "    "));
																	
								});
							});	
						});
						

					}
			});
				
				
		} else {
			console.log("[405] " + request.method + " to " + request.url);
			response.writeHead(405, "Method not supported", {'Content-Type': 'application/json'});
			response.end('<html><head><title>405 - Method not supported</title></head><body><h1>Method not supported.</h1></body></html>');
		}
	

}
function getweather(pathname, client, response, request){
		//Example of message to be sent (http://localhost:8889/getweather
		//VER BIEN EL TEMA DE QUE SOLO COMPARE DIA Y HORA
		// Arguments: zipcode and token
		// Response: weathercode
		
		client.connect();
		if (request.method == 'POST') {
			console.log("[200] " + request.method + " to " + request.url);
			var fullBody = '';
			
			request.on('data', function(chunk) {
			    fullBody += chunk.toString();
			});
			
			request.on('end', function() {
			
			 
			  
			// parse the received body data
				var decodedBody = querystring.parse(fullBody);			
				var token = querystring.parse(fullBody)["token"];
				var zipcode = querystring.parse(fullBody)["zipcode"];
				
				//VERIFICACION DE LAS VARIABLES
				
				if (!zipcode || !token ){
						
						response.writeHead(400, "Bad Request", {'Content-Type': 'application/json'});
						response.end('{ "description":"missing parameters" }');
						
					} else {
					
						//REALIZO LAS QUERY
						var rollback1 = function(client) {
							client.query('ROLLBACK', function() {
							response.writeHead(400, "Bad Request", {'Content-Type': 'application/json'});
							response.end('{ "description":"wrong parameters" }');
							client.end();
							});
						};
						var rollback = function(client) {
							client.query('ROLLBACK', function() {
							response.writeHead(500, "Query Error", {'Content-Type': 'application/json'});
							response.end('{ "description":"Query Error." }');
							client.end();
							});
						};
						client.query('BEGIN', function(err, results) {
							if(err) return rollback(client);	
							client.query('SELECT iduser FROM sessiontoken  WHERE  localtimestamp(0) < expirationdate AND token =  \'' + token + '\'', function (err, results) {
								if(err) return rollback1(client);
								
								// CHEQUEO SI EL USUARIO EXISTE
								if(results.rowCount == "0") return rollback1(client);
								var iduser = results.rows[0].iduser;
								var today = (moment(Date.now()).format('YYYY-MM-DD'));
								client.query('SELECT conditions FROM weather WHERE zipcode = \'' + zipcode + '\' AND dateweather =  \'' + today + '\'' , function (err, results) {
								if(err) return rollback(client);
								
									
										
										client.query('COMMIT', client.end.bind(client));
										response.writeHead(200, "OK", {'Content-Type': 'application/json'});
										response.end( JSON.stringify(results.rows, null, "    ") );
																	
								});
							});	
						});
						

					}
			});
				
				
		} else {
			console.log("[405] " + request.method + " to " + request.url);
			response.writeHead(405, "Method not supported", {'Content-Type': 'application/json'});
			response.end('<html><head><title>405 - Method not supported</title></head><body><h1>Method not supported.</h1></body></html>');
		}
		
}
//
//
//					PANTALLA History
//
//
function getUnitSensorInformation(pathname, client, response, request){
		//Example of message to be sent (http://localhost:8889/getUnitSensorInformation
		// Arguments: idunit and token
		// Response: history info
		
		client.connect();
		if (request.method == 'POST') {
			console.log("[200] " + request.method + " to " + request.url);
			var fullBody = '';
			
			request.on('data', function(chunk) {
			    fullBody += chunk.toString();
			});
			
			request.on('end', function() {
			
			 
			  
			// parse the received body data
				var decodedBody = querystring.parse(fullBody);			
				var token = querystring.parse(fullBody)["token"];
				var idunit = querystring.parse(fullBody)["idunit"];
				
				//VERIFICACION DE LAS VARIABLES
				
				if (!idunit || !token ){
						
						response.writeHead(400, "Bad Request", {'Content-Type': 'application/json'});
						response.end('{ "description":"missing parameters" }');
						
					} else {
					
						//REALIZO LAS QUERY
						var rollback1 = function(client) {
							client.query('ROLLBACK', function() {
							response.writeHead(400, "Bad Request", {'Content-Type': 'application/json'});
							response.end('{ "description":"wrong parameters" }');
							client.end();
							});
						};
						var rollback = function(client) {
							client.query('ROLLBACK', function() {
							response.writeHead(500, "Query Error", {'Content-Type': 'application/json'});
							response.end('{ "description":"Query Error." }');
							client.end();
							});
						};
						client.query('BEGIN', function(err, results) {
							if(err) return rollback(client);	
							client.query('SELECT iduser FROM sessiontoken  WHERE  localtimestamp(0) < expirationdate AND token =  \'' + token + '\'', function (err, results) {
								if(err) return rollback1(client);
								
								// CHEQUEO SI EL USUARIO EXISTE
								if(results.rowCount == "0") return rollback1(client);
								var iduser = results.rows[0].iduser;
								
								client.query('SELECT * FROM History h WHERE EXTRACT( YEAR FROM h.date) = EXTRACT(YEAR FROM CURRENT_DATE) AND h.idUnit = \'' + idunit + '\'' , function (err, results) {
								if(err) return rollback(client);
								
									
										
										client.query('COMMIT', client.end.bind(client));
										response.writeHead(200, "OK", {'Content-Type': 'application/json'});
										response.end( JSON.stringify(results.rows, null, "    ") );
																	
								});
							});	
						});
						

					}
			});
				
				
		} else {
			console.log("[405] " + request.method + " to " + request.url);
			response.writeHead(405, "Method not supported", {'Content-Type': 'application/json'});
			response.end('<html><head><title>405 - Method not supported</title></head><body><h1>Method not supported.</h1></body></html>');
		}
	

}
function getHistory(pathname, client, response, request){
		//Example of message to be sent (http://localhost:8889/getHistory?idunit="idunit"&bottomdate=""&topdate="topdate")
		// Arguments: idunit bottomdate  topdate and token
		// Response: history info
		
		client.connect();
		if (request.method == 'POST') {
			console.log("[200] " + request.method + " to " + request.url);
			var fullBody = '';
			
			request.on('data', function(chunk) {
			    fullBody += chunk.toString();
			});
			
			request.on('end', function() {
			
			 
			  
			// parse the received body data
				var decodedBody = querystring.parse(fullBody);			
				var token = querystring.parse(fullBody)["token"];
				var idunit = querystring.parse(fullBody)["idunit"];
				var bottomdate = querystring.parse(fullBody)["bottomdate"];
				var topdate = querystring.parse(fullBody)["topdate"];
				//VERIFICACION DE LAS VARIABLES
				
				if (!idunit || !token || !bottomdate || !topdate ){
						
						response.writeHead(400, "Bad Request", {'Content-Type': 'application/json'});
						response.end('{ "description":"missing parameters" }');
						
					} else {
					
						//REALIZO LAS QUERY
						var rollback1 = function(client) {
							client.query('ROLLBACK', function() {
							response.writeHead(400, "Bad Request", {'Content-Type': 'application/json'});
							response.end('{ "description":"wrong parameters" }');
							client.end();
							});
						};
						var rollback = function(client) {
							client.query('ROLLBACK', function() {
							response.writeHead(500, "Query Error", {'Content-Type': 'application/json'});
							response.end('{ "description":"Query Error." }');
							client.end();
							});
						};
						client.query('BEGIN', function(err, results) {
							if(err) return rollback(client);	
							client.query('SELECT iduser FROM sessiontoken  WHERE  localtimestamp(0) < expirationdate AND token =  \'' + token + '\'', function (err, results) {
								if(err) return rollback1(client);
								
								// CHEQUEO SI EL USUARIO EXISTE
								if(results.rowCount == "0") return rollback1(client);
								var iduser = results.rows[0].iduser;
								
								client.query('SELECT h.idunit,  h.date as Historydate,  h.duration, (SELECT w.temperature FROM weather w  WHERE date_trunc(\'day\', w.dateweather) = date_trunc(\'day\', h.date) AND w.dateweather >= date_trunc(\'day\', h.date) + time \'12:00\' AND w.zipcode = u.zipcode order by w.dateweather  desc LIMIT 1) as temperature, (SELECT w.conditions FROM weather w WHERE date_trunc(\'day\', w.dateweather) = date_trunc(\'day\', h.date) AND w.dateweather >= date_trunc(\'day\', h.date) + time \'12:00\' AND w.zipcode = u.zipcode order by w.dateweather  desc LIMIT 1) as weathericon, (SELECT w.precipitation  FROM weather w  WHERE date_trunc(\'day\', w.dateweather) = date_trunc(\'day\', h.date) AND w.dateweather >= date_trunc(\'day\', h.date) + time \'12:00\' AND w.zipcode = u.zipcode order by w.dateweather  desc LIMIT 1) as precipitation  FROM  History h,  unit u WHERE h.date  BETWEEN \'' + bottomdate + '\' AND \'' + topdate + '\'  AND u.idUnit = \'' + idunit + '\' AND u.idUnit = h.idUnit' , function (err, results) {
								console.log(err);
								if(err) return rollback(client);
								
									
										
										client.query('COMMIT', client.end.bind(client));
										response.writeHead(200, "OK", {'Content-Type': 'application/json'});
										response.end( JSON.stringify(results.rows, null, "    ") );
																	
								});
							});	
						});
						

					}
			});
				
				
		} else {
			console.log("[405] " + request.method + " to " + request.url);
			response.writeHead(405, "Method not supported", {'Content-Type': 'application/json'});
			response.end('<html><head><title>405 - Method not supported</title></head><body><h1>Method not supported.</h1></body></html>');
		}
	
}
function insertHistory(pathname, client, response, request){
		//Example of message to be sent (http://localhost:8889/insertHistory?unitidentifier="unitidentifier"&duration="duration"&date="date"
		client.connect();
		var String = url.parse(request.url).query;
		var duration = querystring.parse(String)["duration"];
		var unitidentifier = querystring.parse(String)["unitidentifier"];
		var date = querystring.parse(String)["date"];
		
	
		var rollback = function(client) {
			client.query('ROLLBACK', function() {
			response.end('{"result" : "Error"}');
			client.end();
			});
		};
		
		client.query('BEGIN', function(err, results) {
			if(err) return rollback(client);	
			client.query('SELECT idunit FROM Unit WHERE "unitidentifier" = \'' + unitidentifier + '\'', function (err, results) {
				if(err) return rollback(client);
				
				var idunit = results.rows[0].idunit;
				client.query('INSERT INTO history (idunit, duration, date) VALUES (\'' + idunit + '\', \'' + duration + '\', \'' + date + '\')', function (err, results) {
				
					if(err) return rollback(client);
					client.query('COMMIT', client.end.bind(client));
					response.end('{"result" : "succes"}');
					
				});
			});	
		});
}
//
//
//					PANTALLA Settings
//
//
function getUnitZones(pathname, client, response, request){
		//Example of message to be sent (http://localhost:8889/getUnitZones
		// Arguments: idunit and token
		// Response: UnitZones info
		
		client.connect();
		if (request.method == 'POST') {
			console.log("[200] " + request.method + " to " + request.url);
			var fullBody = '';
			
			request.on('data', function(chunk) {
			    fullBody += chunk.toString();
			});
			
			request.on('end', function() {
			
			 
			  
			// parse the received body data
				var decodedBody = querystring.parse(fullBody);			
				var token = querystring.parse(fullBody)["token"];
				var idunit = querystring.parse(fullBody)["idunit"];
				
				//VERIFICACION DE LAS VARIABLES
				
				if (!idunit || !token ){
						
						response.writeHead(400, "Bad Request", {'Content-Type': 'application/json'});
						response.end('{ "description":"missing parameters" }');
						
					} else {
					
						//REALIZO LAS QUERY
						var rollback1 = function(client) {
							client.query('ROLLBACK', function() {
							response.writeHead(400, "Bad Request", {'Content-Type': 'application/json'});
							response.end('{ "description":"wrong parameters" }');
							client.end();
							});
						};
						var rollback = function(client) {
							client.query('ROLLBACK', function() {
							response.writeHead(500, "Query Error", {'Content-Type': 'application/json'});
							response.end('{ "description":"Query Error." }');
							client.end();
							});
						};
						client.query('BEGIN', function(err, results) {
							if(err) return rollback(client);	
							client.query('SELECT iduser FROM sessiontoken  WHERE  localtimestamp(0) < expirationdate AND token =  \'' + token + '\'', function (err, results) {
								if(err) return rollback1(client);
								
								// CHEQUEO SI EL USUARIO EXISTE
								if(results.rowCount == "0") return rollback1(client);
								var iduser = results.rows[0].iduser;
								
								client.query('SELECT * FROM zone WHERE idUnit = \'' + idunit + '\' order by idzone asc' , function (err, results) {
								if(err) return rollback(client);
								
									
										
										client.query('COMMIT', client.end.bind(client));
										response.writeHead(200, "OK", {'Content-Type': 'application/json'});
										response.end( JSON.stringify(results.rows, null, "    ") );
																	
								});
							});	
						});
						

					}
			});
				
				
		} else {
			console.log("[405] " + request.method + " to " + request.url);
			response.writeHead(405, "Method not supported", {'Content-Type': 'application/json'});
			response.end('<html><head><title>405 - Method not supported</title></head><body><h1>Method not supported.</h1></body></html>');
		}
}
function getSensorSettings(pathname, client, response, request){
		// YA ESTA CAMBIADA PARA ENABLE/DISABLE DE LOS SENSORES Y UNIT
		//Example of message to be sent (http://localhost:8889/getSensorSettings
		// Arguments: idunit and token
		// Response: SensorSettings info
		
		client.connect();
		if (request.method == 'POST') {
			console.log("[200] " + request.method + " to " + request.url);
			var fullBody = '';
			
			request.on('data', function(chunk) {
			    fullBody += chunk.toString();
			});
			
			request.on('end', function() {
			
			 
			  
			// parse the received body data
				var decodedBody = querystring.parse(fullBody);			
				var token = querystring.parse(fullBody)["token"];
				var idunit = querystring.parse(fullBody)["idunit"];
				
				//VERIFICACION DE LAS VARIABLES
				
				if (!idunit || !token ){
						
						response.writeHead(400, "Bad Request", {'Content-Type': 'application/json'});
						response.end('{ "description":"missing parameters" }');
						
					} else {
					
						//REALIZO LAS QUERY
						var rollback1 = function(client) {
							client.query('ROLLBACK', function() {
							response.writeHead(400, "Bad Request", {'Content-Type': 'application/json'});
							response.end('{ "description":"wrong parameters" }');
							client.end();
							});
						};
						var rollback = function(client) {
							client.query('ROLLBACK', function() {
							response.writeHead(500, "Query Error", {'Content-Type': 'application/json'});
							response.end('{ "description":"Query Error." }');
							client.end();
							});
						};
						client.query('BEGIN', function(err, results) {
							if(err) return rollback(client);	
							client.query('SELECT iduser FROM sessiontoken  WHERE  localtimestamp(0) < expirationdate AND token =  \'' + token + '\'', function (err, results) {
								if(err) return rollback1(client);
								
								// CHEQUEO SI EL USUARIO EXISTE
								if(results.rowCount == "0") return rollback1(client);
								var iduser = results.rows[0].iduser;
								
								client.query('SELECT s.idsensor as idsensor, s.alias as alias, s.idsoiltype as idsoiltype, s.idgrasstype as idgrasstype, s.idsystemtype as idsystemtype, s.sensoridentifier as sensoridentifier  FROM Sensor as s, unit as u WHERE s.idUnit = \'' + idunit + '\' AND  s.idUnit = u.idunit AND u.isenable = \'TRUE\' AND s.isenable = \'TRUE\'' , function (err, results) {
								if(err) return rollback(client);
								
									
										
										client.query('COMMIT', client.end.bind(client));
										response.writeHead(200, "OK", {'Content-Type': 'application/json'});
										response.end( JSON.stringify(results.rows, null, "    ") );
																	
								});
							});	
						});
						

					}
			});
				
				
		} else {
			console.log("[405] " + request.method + " to " + request.url);
			response.writeHead(405, "Method not supported", {'Content-Type': 'application/json'});
			response.end('<html><head><title>405 - Method not supported</title></head><body><h1>Method not supported.</h1></body></html>');
		}

}
function getZonesData(pathname, client, response, request){
		//Example of message to be sent (http://localhost:8889/getZonesData="idunit")
		// Arguments: idunit and token
		// Response: Zone data
		
		client.connect();
		if (request.method == 'POST') {
			console.log("[200] " + request.method + " to " + request.url);
			var fullBody = '';
			
			request.on('data', function(chunk) {
			    fullBody += chunk.toString();
			});
			
			request.on('end', function() {
			
			 
			  
			// parse the received body data
				var decodedBody = querystring.parse(fullBody);			
				var token = querystring.parse(fullBody)["token"];
				var idunit = querystring.parse(fullBody)["idunit"];
				
				//VERIFICACION DE LAS VARIABLES
				
				if (!idunit || !token ){
						
						response.writeHead(400, "Bad Request", {'Content-Type': 'application/json'});
						response.end('{ "description":"missing parameters" }');
						
					} else {
					
						//REALIZO LAS QUERY
						var rollback1 = function(client) {
							client.query('ROLLBACK', function() {
							response.writeHead(400, "Bad Request", {'Content-Type': 'application/json'});
							response.end('{ "description":"wrong parameters" }');
							client.end();
							});
						};
						var rollback = function(client) {
							client.query('ROLLBACK', function() {
							response.writeHead(500, "Query Error", {'Content-Type': 'application/json'});
							response.end('{ "description":"Query Error." }');
							client.end();
							});
						};
						client.query('BEGIN', function(err, results) {
							if(err) return rollback(client);	
							client.query('SELECT iduser FROM sessiontoken  WHERE  localtimestamp(0) < expirationdate AND token =  \'' + token + '\'', function (err, results) {
								if(err) return rollback1(client);
								
								// CHEQUEO SI EL USUARIO EXISTE
								if(results.rowCount == "0") return rollback1(client);
								var iduser = results.rows[0].iduser;
								
								client.query('SELECT * FROM zone WHERE idUnit =  \'' + idunit + '\' order by zone asc' , function (err, results) {
								if(err) return rollback(client);
								
									
										
										client.query('COMMIT', client.end.bind(client));
										response.writeHead(200, "OK", {'Content-Type': 'application/json'});
										response.end( JSON.stringify(results.rows, null, "    ") );
																	
								});
							});	
						});
						

					}
			});
				
				
		} else {
			console.log("[405] " + request.method + " to " + request.url);
			response.writeHead(405, "Method not supported", {'Content-Type': 'application/json'});
			response.end('<html><head><title>405 - Method not supported</title></head><body><h1>Method not supported.</h1></body></html>');
		}
}
function linkSensorToZone(pathname, client, response, request){
		//Example of message to be sent http://localhost:8889/linkSensorToZone
		// Arguments: idsensor idzone and token
		// Response: 200 ok
		
		client.connect();
		if (request.method == 'POST') {
			console.log("[200] " + request.method + " to " + request.url);
			var fullBody = '';
			
			request.on('data', function(chunk) {
			    fullBody += chunk.toString();
			});
			
			request.on('end', function() {
			
			 
			  
			// parse the received body data
				var decodedBody = querystring.parse(fullBody);			
				var token = querystring.parse(fullBody)["token"];
				var idzone = querystring.parse(fullBody)["idzone"];
				var idsensor = querystring.parse(fullBody)["idsensor"];
				
				//VERIFICACION DE LAS VARIABLES
				
				if (!idzone || !token || !idsensor){
						
						response.writeHead(400, "Bad Request", {'Content-Type': 'application/json'});
						response.end('{ "description":"missing parameters" }');
						
					} else {
					
						//REALIZO LAS QUERY
						var rollback1 = function(client) {
							client.query('ROLLBACK', function() {
							response.writeHead(400, "Bad Request", {'Content-Type': 'application/json'});
							response.end('{ "description":"wrong parameters" }');
							client.end();
							});
						};
						var rollback = function(client) {
							client.query('ROLLBACK', function() {
							response.writeHead(500, "Query Error", {'Content-Type': 'application/json'});
							response.end('{ "description":"Query Error." }');
							client.end();
							});
						};
						client.query('BEGIN', function(err, results) {
							if(err) return rollback(client);	
							client.query('SELECT iduser FROM sessiontoken  WHERE  localtimestamp(0) < expirationdate AND token =  \'' + token + '\'', function (err, results) {
								if(err) return rollback1(client);
								
								// CHEQUEO SI EL USUARIO EXISTE
								if(results.rowCount == "0") return rollback1(client);
								var iduser = results.rows[0].iduser;
								
								client.query('UPDATE Zone SET idSensor = \'' + idsensor + '\' WHERE idzone = \'' + idzone + '\'' , function (err, results) {
								if(err) return rollback(client);
								
									
										
										client.query('COMMIT', client.end.bind(client));
										response.writeHead(200, "OK", {'Content-Type': 'application/json'});
										response.end('');
																	
								});
							});	
						});
						

					}
			});
				
				
		} else {
			console.log("[405] " + request.method + " to " + request.url);
			response.writeHead(405, "Method not supported", {'Content-Type': 'application/json'});
			response.end('<html><head><title>405 - Method not supported</title></head><body><h1>Method not supported.</h1></body></html>');
		}
}
function DeleteSensor(pathname, client, response, request){
		//Example of message to be sent (http://localhost:8889/DeleteSensor
		// Arguments: idsensor  and token
		// Response: 200 ok
		
		client.connect();
		if (request.method == 'POST') {
			console.log("[200] " + request.method + " to " + request.url);
			var fullBody = '';
			
			request.on('data', function(chunk) {
			    fullBody += chunk.toString();
			});
			
			request.on('end', function() {
			
			 
			  
			// parse the received body data
				var decodedBody = querystring.parse(fullBody);			
				var token = querystring.parse(fullBody)["token"];

				var idsensor = querystring.parse(fullBody)["idsensor"];
				
				//VERIFICACION DE LAS VARIABLES
				
				if ( !token || !idsensor){
						
						response.writeHead(400, "Bad Request", {'Content-Type': 'application/json'});
						response.end('{ "description":"missing parameters" }');
						
					} else {
					
						//REALIZO LAS QUERY
						var rollback1 = function(client) {
							client.query('ROLLBACK', function() {
							response.writeHead(400, "Bad Request", {'Content-Type': 'application/json'});
							response.end('{ "description":"wrong parameters" }');
							client.end();
							});
						};
						var rollback = function(client) {
							client.query('ROLLBACK', function() {
							response.writeHead(500, "Query Error", {'Content-Type': 'application/json'});
							response.end('{ "description":"Query Error." }');
							client.end();
							});
						};
						client.query('BEGIN', function(err, results) {
							if(err) return rollback(client);	
							client.query('SELECT iduser FROM sessiontoken  WHERE  localtimestamp(0) < expirationdate AND token =  \'' + token + '\'', function (err, results) {
								if(err) return rollback1(client);
								
								// CHEQUEO SI EL USUARIO EXISTE
								if(results.rowCount == "0") return rollback1(client);
								
								console.log(idsensor);
								client.query('DELETE FROM sensordata where idsensor = \'' + idsensor + '\'' , function (err, results) {
								console.log(err);
								if(err) return rollback(client);
									client.query('UPDATE zone SET idsensor = null WHERE idsensor = \'' + idsensor + '\'' , function (err, results) {
									console.log(err);
									if(err) return rollback(client);
										client.query('DELETE FROM sensor where idsensor = \'' + idsensor + '\'' , function (err, results) {
										console.log(err);
										if(err) return rollback(client);
									
										
											client.query('COMMIT', client.end.bind(client));
											response.writeHead(200, "OK", {'Content-Type': 'application/json'});
											response.end('');
											
										});	
									});							
								});
							});	
						});
						

					}
			});
				
				
		} else {
			console.log("[405] " + request.method + " to " + request.url);
			response.writeHead(405, "Method not supported", {'Content-Type': 'application/json'});
			response.end('<html><head><title>405 - Method not supported</title></head><body><h1>Method not supported.</h1></body></html>');
		}
}
function DeleteUnit(pathname, client, response, request){
		//Example of message to be sent (http://localhost:8889/DeleteUnit
		// Arguments: idunit  and token
		// Response: 200 ok
		
		client.connect();
		if (request.method == 'POST') {
			console.log("[200] " + request.method + " to " + request.url);
			var fullBody = '';
			
			request.on('data', function(chunk) {
			    fullBody += chunk.toString();
			});
			
			request.on('end', function() {
			
			 
			  
			// parse the received body data
				var decodedBody = querystring.parse(fullBody);			
				var token = querystring.parse(fullBody)["token"];

				var idunit = querystring.parse(fullBody)["idunit"];
				
				//VERIFICACION DE LAS VARIABLES
				
				if ( !token || !idunit){
						
						response.writeHead(400, "Bad Request", {'Content-Type': 'application/json'});
						response.end('{ "description":"missing parameters" }');
						
					} else {
					
						//REALIZO LAS QUERY
						var rollback1 = function(client) {
							client.query('ROLLBACK', function() {
							response.writeHead(400, "Bad Request", {'Content-Type': 'application/json'});
							response.end('{ "description":"wrong parameters" }');
							client.end();
							});
						};
						var rollback = function(client) {
							client.query('ROLLBACK', function() {
							response.writeHead(500, "Query Error", {'Content-Type': 'application/json'});
							response.end('{ "description":"Query Error." }');
							client.end();
							});
						};
						client.query('BEGIN', function(err, results) {
							if(err) return rollback(client);	
							client.query('SELECT iduser FROM sessiontoken  WHERE  localtimestamp(0) < expirationdate AND token =  \'' + token + '\'', function (err, results) {
								if(err) return rollback1(client);
								
								// CHEQUEO SI EL USUARIO EXISTE
								if(results.rowCount == "0") return rollback1(client);
								var iduser = results.rows[0].iduser;
								
								client.query('UPDATE unit SET isenable = \'FALSE\' WHERE idunit = \'' + idunit + '\'' , function (err, results) {
								if(err) return rollback(client);
								
									
										
										client.query('COMMIT', client.end.bind(client));
										response.writeHead(200, "OK", {'Content-Type': 'application/json'});
										response.end('');
																	
								});
							});	
						});
						

					}
			});
				
				
		} else {
			console.log("[405] " + request.method + " to " + request.url);
			response.writeHead(405, "Method not supported", {'Content-Type': 'application/json'});
			response.end('<html><head><title>405 - Method not supported</title></head><body><h1>Method not supported.</h1></body></html>');
		}
}
function CreateDeleteZone(pathname, client, response, request){
		// NO SE VA A USAR SE LO DEJA NOMAS POR SI EN UN FUTURO UNIFICAMOS LOS DEMAS PATH
		//Example of message to be sent (http://localhost:8889/CreateDeleteZone
		//http://localhost:8889/CreateDeleteZone
		// Arguments: idsensor, zone, enabled="TRUE/FALSE"(De este depende si se crea o no) idunit, manual=1/2 alias, idzone and token
		// PARA CREAR: token, enabled, idzone, idsensor, zone, manual, idunit, alias
		// PARA BORRAR: token, enabled, idzone
		// Response: 200 ok
		
		client.connect();
		if (request.method == 'POST') {
			console.log("[200] " + request.method + " to " + request.url);
			var fullBody = '';
			
			request.on('data', function(chunk) {
			    fullBody += chunk.toString();
			});
			
			request.on('end', function() {
			
			 
			  
			// parse the received body data
				var decodedBody = querystring.parse(fullBody);			
				var token = querystring.parse(fullBody)["token"];
				var idzone = querystring.parse(fullBody)["idzone"];
				var idsensor = querystring.parse(fullBody)["idsensor"];
				var zone = querystring.parse(fullBody)["zone"];
				var enabled = querystring.parse(fullBody)["enabled"];
				var manual = querystring.parse(fullBody)["manual"];
				var idunit = querystring.parse(fullBody)["idunit"];
				var alias = querystring.parse(fullBody)["alias"];
				
				//VERIFICACION DE LAS VARIABLES
				
					if ( !token || !enabled  ){
						
						response.writeHead(400, "Bad Request", {'Content-Type': 'application/json'});
						response.end('{ "description":"missing parameters" }');
						
					} else {
					
						//REALIZO LAS QUERY
						var rollback1 = function(client) {
							client.query('ROLLBACK', function() {
							response.writeHead(400, "Bad Request", {'Content-Type': 'application/json'});
							response.end('{ "description":"wrong parameters" }');
							client.end();
							});
						};
						var rollback = function(client) {
							client.query('ROLLBACK', function() {
							response.writeHead(500, "Query Error", {'Content-Type': 'application/json'});
							response.end('{ "description":"Query Error." }');
							client.end();
							});
						};
						if (enabled === "TRUE"){
						
							if ( !idzone || !idsensor || !zone  || !manual || !idunit || !alias ){
						
								response.writeHead(400, "Bad Request", {'Content-Type': 'application/json'});
								response.end('{ "description":"missing parameters" }');
						
								} else {
								
									client.query('BEGIN', function(err, results) {
										if(err) return rollback(client);	
										client.query('SELECT iduser FROM sessiontoken  WHERE  localtimestamp(0) < expirationdate AND token =  \'' + token + '\'', function (err, results) {
											if(err) return rollback1(client);
											
											// CHEQUEO SI EL USUARIO EXISTE
											if(results.rowCount == "0") return rollback1(client);
											var iduser = results.rows[0].iduser;
											
											client.query('SELECT * FROM zone WHERE idzone = \'' + idzone + '\' AND zone = \'' + zone + '\'', function (err, results) {
												if(err) return rollback(client);
													if(results.rowCount === 0) {
														client.query('INSERT INTO zone (manual, alias, idsensor, idunit, zone, enabled) VALUES (\'' + manual + '\', \'' + alias + '\', \'' + idsensor + '\', \'' + idunit + '\', \'' + zone + '\', \'' + enabled + '\')', function (err, results) {
															
															if(err) return rollback(client);
															client.query('COMMIT', client.end.bind(client));
															response.writeHead(200, "OK", {'Content-Type': 'application/json'});
															response.end('');
														});
													} else {

														client.query('UPDATE zone SET enabled = \'TRUE\' , "manual" =\'' + manual + '\', "alias" =\'' + alias + '\' WHERE zone = \'' + zone + '\' AND idsensor = \'' + idsensor + '\'', function (err, results) {
															if(err) return rollback(client);
															client.query('COMMIT', client.end.bind(client));
															response.writeHead(200, "OK", {'Content-Type': 'application/json'});
															response.end('');
															
														});

													}

											});
										});	
									});
								}
						}
						
						if (enabled === "FALSE"){
							if (!idzone ){
						
								response.writeHead(400, "Bad Request", {'Content-Type': 'application/json'});
								response.end('{ "description":"missing parameters" }');
						
							} else {
								client.query('BEGIN', function(err, results) {
									if(err) return rollback(client);	
									client.query('SELECT iduser FROM sessiontoken  WHERE  localtimestamp(0) < expirationdate AND token =  \'' + token + '\'', function (err, results) {
										if(err) return rollback1(client);
										
										// CHEQUEO SI EL USUARIO EXISTE
										if(results.rowCount == "0") return rollback1(client);
										var iduser = results.rows[0].iduser;
										
										client.query('UPDATE zone SET enabled = \'FALSE\' WHERE idzone = \'' + idzone + '\'' , function (err, results) {
										if(err) return rollback(client);
										
											
												
												client.query('COMMIT', client.end.bind(client));
												response.writeHead(200, "OK", {'Content-Type': 'application/json'});
												response.end('');
																			
										});
									});	
								});
							}	
						}

					}
			});
				
				
		} else {
			console.log("[405] " + request.method + " to " + request.url);
			response.writeHead(405, "Method not supported", {'Content-Type': 'application/json'});
			response.end('<html><head><title>405 - Method not supported</title></head><body><h1>Method not supported.</h1></body></html>');
		}

}
function CreateZone(pathname, client, response, request){
		//Example of message to be sent (http://localhost:8889/CreateZone
		//http://localhost:8889/CreateZone
		// Arguments: idsensor, zone, idunit, manual= TRUE/FALSE alias,  and token
		
		
		client.connect();
		if (request.method == 'POST') {
			console.log("[200] " + request.method + " to " + request.url);
			var fullBody = '';
			
			request.on('data', function(chunk) {
			    fullBody += chunk.toString();
			});
			
			request.on('end', function() {
			
			 
			  
			// parse the received body data
				var decodedBody = querystring.parse(fullBody);			
				var token = querystring.parse(fullBody)["token"];
				var zone = querystring.parse(fullBody)["zone"];
				var manual = querystring.parse(fullBody)["manual"];
				var idunit = querystring.parse(fullBody)["idunit"];
				var alias = querystring.parse(fullBody)["alias"];
				console.log(zone);
				
				//VERIFICACION DE LAS VARIABLES
				
				if (!zone || !token  || !manual || !idunit || !alias){
						
						response.writeHead(400, "Bad Request", {'Content-Type': 'application/json'});
						response.end('{ "description":"missing parameters" }');
						console.log(zone);
						
					
						
						} else {
						
							//REALIZO LAS QUERY
							var rollback1 = function(client) {
								client.query('ROLLBACK', function() {
								response.writeHead(400, "Bad Request", {'Content-Type': 'application/json'});
								response.end('{ "description":"wrong parameters" }');
								client.end();
								});
							};
							var rollback = function(client) {
								client.query('ROLLBACK', function() {
								response.writeHead(500, "Query Error", {'Content-Type': 'application/json'});
								response.end('{ "description":"Query Error." }');
								client.end();
								});
							};
							var rollback2 = function(client) {
								console.log("ES MAYOR A 12");
								response.writeHead(400, "Bad Request", {'Content-Type': 'application/json'});
								response.end('{ "description":"wrong parameters" }');
								client.end();
								
							};
							if (zone >= 13)return rollback2(client);
										client.query('BEGIN', function(err, results) {
											if(err) return rollback(client);	
											client.query('SELECT iduser FROM sessiontoken  WHERE  localtimestamp(0) < expirationdate AND token =  \'' + token + '\'', function (err, results) {
												if(err) return rollback1(client);
												
												// CHEQUEO SI EL USUARIO EXISTE
												if(results.rowCount == "0") return rollback1(client);
												var iduser = results.rows[0].iduser;
												
												client.query('SELECT * FROM zone WHERE idunit = \'' + idunit + '\' AND zone = \'' + zone + '\'', function (err, results) {
													if(err) return rollback(client);
														if(results.rowCount === 0) {
															client.query('INSERT INTO zone (manual, alias, idunit, zone, enabled) VALUES (\'' + manual + '\', \'' + alias + '\', \'' + idunit + '\', \'' + zone + '\', \'TRUE\') RETURNING idzone', function (err, results) {
																
																if(err) return rollback(client);
																var idzone = results.rows[0].idzone;
																client.query('COMMIT', client.end.bind(client));
																response.writeHead(200, "OK", {'Content-Type': 'application/json'});
																response.end('{"idzone" : "' + idzone + '"}');
															});
														} else {


																client.query('COMMIT', client.end.bind(client));
																response.writeHead(400, "Zone already exist", {'Content-Type': 'application/json'});
																response.end('');
																
															

														}

												});
											});	
										});
							

						}
					
			});
				
				
		} else {
			console.log("[405] " + request.method + " to " + request.url);
			response.writeHead(405, "Method not supported", {'Content-Type': 'application/json'});
			response.end('<html><head><title>405 - Method not supported</title></head><body><h1>Method not supported.</h1></body></html>');
		}
}
function DeleteZone(pathname, client, response, request){
		//Example of message to be sent (http://localhost:8889/DeleteZone
		//http://localhost:8889/DeleteZone
		// Arguments: idzone and token
		
		
		client.connect();
		if (request.method == 'POST') {
			console.log("[200] " + request.method + " to " + request.url);
			var fullBody = '';
			
			request.on('data', function(chunk) {
			    fullBody += chunk.toString();
			});
			
			request.on('end', function() {
			
			 
			  
			// parse the received body data
				var decodedBody = querystring.parse(fullBody);			
				var token = querystring.parse(fullBody)["token"];
				var idzone = querystring.parse(fullBody)["idzone"];
				
				//VERIFICACION DE LAS VARIABLES
				
				if (!idzone || !token ){
						
						response.writeHead(400, "Bad Request", {'Content-Type': 'application/json'});
						response.end('{ "description":"missing parameters" }');
						
					} else {
					
						//REALIZO LAS QUERY
						var rollback1 = function(client) {
							client.query('ROLLBACK', function() {
							response.writeHead(400, "Bad Request", {'Content-Type': 'application/json'});
							response.end('{ "description":"wrong parameters" }');
							client.end();
							});
						};
						var rollback = function(client) {
							client.query('ROLLBACK', function() {
							response.writeHead(500, "Query Error", {'Content-Type': 'application/json'});
							response.end('{ "description":"Query Error." }');
							client.end();
							});
						};
								client.query('BEGIN', function(err, results) {
									if(err) return rollback(client);	
									client.query('SELECT iduser FROM sessiontoken  WHERE  localtimestamp(0) < expirationdate AND token =  \'' + token + '\'', function (err, results) {
										if(err) return rollback1(client);
										
										// CHEQUEO SI EL USUARIO EXISTE
										if(results.rowCount == "0") return rollback1(client);
										var iduser = results.rows[0].iduser;
										
										client.query('UPDATE zone SET enabled = \'FALSE\' WHERE idzone = \'' + idzone + '\'' , function (err, results) {
										if(err) return rollback(client);
										
											
												
												client.query('COMMIT', client.end.bind(client));
												response.writeHead(200, "OK", {'Content-Type': 'application/json'});
												response.end('');
																			
										});
									});	
								});
						

					}
			});
				
				
		} else {
			console.log("[405] " + request.method + " to " + request.url);
			response.writeHead(405, "Method not supported", {'Content-Type': 'application/json'});
			response.end('<html><head><title>405 - Method not supported</title></head><body><h1>Method not supported.</h1></body></html>');
		}
}
function UpdateZone(pathname, client, response, request){
		//http://localhost:8889/UpdateZone
		// Arguments: idzone, manual= TRUE/FALSE alias, enable  and token
		
		
		client.connect();
		if (request.method == 'POST') {
			console.log("[200] " + request.method + " to " + request.url);
			var fullBody = '';
			
			request.on('data', function(chunk) {
			    fullBody += chunk.toString();
			});
			
			request.on('end', function() {
			
			 
			  
			// parse the received body data
				var decodedBody = querystring.parse(fullBody);			
				var token = querystring.parse(fullBody)["token"];
				var idzone = querystring.parse(fullBody)["idzone"];
				var manual = querystring.parse(fullBody)["manual"];
				var alias = querystring.parse(fullBody)["alias"];
				var enable = querystring.parse(fullBody)["enable"];
				//VERIFICACION DE LAS VARIABLES
				
				if (!token || !idzone || !manual || !alias || !enable ){
						
						response.writeHead(400, "Bad Request", {'Content-Type': 'application/json'});
						response.end('{ "description":"missing parameters" }');
						
					} else {
					
						//REALIZO LAS QUERY
						var rollback1 = function(client) {
							client.query('ROLLBACK', function() {
							response.writeHead(400, "Bad Request", {'Content-Type': 'application/json'});
							response.end('{ "description":"wrong parameters" }');
							client.end();
							});
						};
						var rollback = function(client) {
							client.query('ROLLBACK', function() {
							response.writeHead(500, "Query Error", {'Content-Type': 'application/json'});
							response.end('{ "description":"Query Error." }');
							client.end();
							});
						};
									client.query('BEGIN', function(err, results) {
										if(err) return rollback(client);	
										client.query('SELECT iduser FROM sessiontoken  WHERE  localtimestamp(0) < expirationdate AND token =  \'' + token + '\'', function (err, results) {
											if(err) return rollback1(client);
											
											// CHEQUEO SI EL USUARIO EXISTE
											if(results.rowCount == "0") return rollback1(client);
											
						
												client.query('UPDATE zone SET  "manual" =\'' + manual + '\', "alias" =\'' + alias + '\', "enabled" =\'' + enable + '\' WHERE idzone = \'' + idzone + '\'', function (err, results) {
															if(err) return rollback(client);
															client.query('COMMIT', client.end.bind(client));
															response.writeHead(200, "OK", {'Content-Type': 'application/json'});
															response.end('');
															
														});

												

											
										});	
									});
						

					}
			});
				
				
		} else {
			console.log("[405] " + request.method + " to " + request.url);
			response.writeHead(405, "Method not supported", {'Content-Type': 'application/json'});
			response.end('<html><head><title>405 - Method not supported</title></head><body><h1>Method not supported.</h1></body></html>');
		}
}
function UnlinkZone(pathname, client, response, request){
		//http://localhost:8889/UnlinkZone
		// Arguments: idzone  and token
		
		
		client.connect();
		if (request.method == 'POST') {
			console.log("[200] " + request.method + " to " + request.url);
			var fullBody = '';
			
			request.on('data', function(chunk) {
			    fullBody += chunk.toString();
			});
			
			request.on('end', function() {
			
			 
			  
			// parse the received body data
				var decodedBody = querystring.parse(fullBody);			
				var token = querystring.parse(fullBody)["token"];
				var idzone = querystring.parse(fullBody)["idzone"];
				
				//VERIFICACION DE LAS VARIABLES
				
				if (!token || !idzone  ){
						
						response.writeHead(400, "Bad Request", {'Content-Type': 'application/json'});
						response.end('{ "description":"missing parameters" }');
						
					} else {
					
						//REALIZO LAS QUERY
						var rollback1 = function(client) {
							client.query('ROLLBACK', function() {
							response.writeHead(400, "Bad Request", {'Content-Type': 'application/json'});
							response.end('{ "description":"wrong parameters" }');
							client.end();
							});
						};
						var rollback = function(client) {
							client.query('ROLLBACK', function() {
							response.writeHead(500, "Query Error", {'Content-Type': 'application/json'});
							response.end('{ "description":"Query Error." }');
							client.end();
							});
						};
									client.query('BEGIN', function(err, results) {
										if(err) return rollback(client);	
										client.query('SELECT iduser FROM sessiontoken  WHERE  localtimestamp(0) < expirationdate AND token =  \'' + token + '\'', function (err, results) {
											if(err) return rollback1(client);
											
											// CHEQUEO SI EL USUARIO EXISTE
											if(results.rowCount == "0") return rollback1(client);
											
						
												client.query('UPDATE zone SET  "idsensor" = NULL WHERE idzone = \'' + idzone + '\'', function (err, results) {
															if(err) return rollback(client);
															client.query('COMMIT', client.end.bind(client));
															response.writeHead(200, "OK", {'Content-Type': 'application/json'});
															response.end('');
															
														});

												

											
										});	
									});
						

					}
			});
				
				
		} else {
			console.log("[405] " + request.method + " to " + request.url);
			response.writeHead(405, "Method not supported", {'Content-Type': 'application/json'});
			response.end('<html><head><title>405 - Method not supported</title></head><body><h1>Method not supported.</h1></body></html>');
		}
}
//
//
//					PANTALLA SCHEDULE
//
//
function getScheduleData(pathname, client, response, request){
		//Example of message to be sent (http://localhost:8889/getScheduleData?
		// Arguments: idunit, day, time  and token
		// Response: 200 ok
		
		client.connect();
		if (request.method == 'POST') {
			console.log("[200] " + request.method + " to " + request.url);
			var fullBody = '';
			
			request.on('data', function(chunk) {
			    fullBody += chunk.toString();
			});
			
			request.on('end', function() {
			
			 
			  
			// parse the received body data
				var decodedBody = querystring.parse(fullBody);			
				var token = querystring.parse(fullBody)["token"];
				var idunit = querystring.parse(fullBody)["idunit"];
				var day = querystring.parse(fullBody)["day"];
				var time = querystring.parse(fullBody)["time"];
				var moment = require('moment');
				var startdate = (moment(Date.now()).format('YYYY-MM-DD'));


				
				//VERIFICACION DE LAS VARIABLES
				
				if ( !token || !idunit || !day || !time){
						
						response.writeHead(400, "Bad Request", {'Content-Type': 'application/json'});
						response.end('{ "description":"missing parameters" }');
						
					} else {
					
						//REALIZO LAS QUERY
						var rollback1 = function(client) {
							client.query('ROLLBACK', function() {
							response.writeHead(400, "Bad Request", {'Content-Type': 'application/json'});
							response.end('{ "description":"wrong parameters" }');
							client.end();
							});
						};
						var rollback = function(client) {
							client.query('ROLLBACK', function() {
							response.writeHead(500, "Query Error", {'Content-Type': 'application/json'});
							response.end('{ "description":"Query Error." }');
							client.end();
							});
						};
						client.query('BEGIN', function(err, results) {
							if(err) return rollback(client);	
							client.query('SELECT iduser FROM sessiontoken  WHERE  localtimestamp(0) < expirationdate AND token =  \'' + token + '\'', function (err, results) {
								if(err) return rollback1(client);
								
								// CHEQUEO SI EL USUARIO EXISTE
								if(results.rowCount == "0") return rollback1(client);
								var iduser = results.rows[0].iduser;
								
								client.query('SELECT s.idSchedule, s.date, s.time, s.automatic, s.idrecurrence, s.duration,  z.zone, z.idsensor, z.idzone, s.isrestriction, s.isrecurrence, s.remaining_time as remaining_time  FROM Zone z, Schedule s, unit ut WHERE ut.idUnit =  \'' + idunit + '\' AND ut.idUnit = z.idUnit  AND z.idzone = s.idzone  AND s.date BETWEEN \'' + startdate + '\' AND \'' + day + '\' AND s.time >= \'' + time + '\'' , function (err, results) {
								
								if(err) return rollback(client);
								
									
										
										client.query('COMMIT', client.end.bind(client));
										response.writeHead(200, "OK", {'Content-Type': 'application/json'});
										response.end( JSON.stringify(results.rows, null, "    ") );
																	
								});
							});	
						});
						

					}
			});
				
				
		} else {
			console.log("[405] " + request.method + " to " + request.url);
			response.writeHead(405, "Method not supported", {'Content-Type': 'application/json'});
			response.end('<html><head><title>405 - Method not supported</title></head><body><h1>Method not supported.</h1></body></html>');
		}
}
function getRecurrency(pathname, client, response, request){
		//Example of message to be sent (http://localhost:8889/getRecurrency
		// Arguments: idunit, day, time  and token
		// Response: 200 ok
		
		client.connect();
		if (request.method == 'POST') {
			console.log("[200] " + request.method + " to " + request.url);
			var fullBody = '';
			
			request.on('data', function(chunk) {
			    fullBody += chunk.toString();
			});
			
			request.on('end', function() {
			
			 
			  
			// parse the received body data
				var decodedBody = querystring.parse(fullBody);			
				var token = querystring.parse(fullBody)["token"];
				var idunit = querystring.parse(fullBody)["idunit"];
				var moment = require('moment');
				var today = (moment(Date.now()).format('YYYY-MM-DD'));


				
				//VERIFICACION DE LAS VARIABLES
				
				if ( !token || !idunit){
						
						response.writeHead(400, "Bad Request", {'Content-Type': 'application/json'});
						response.end('{ "description":"missing parameters" }');
						
					} else {
					
						//REALIZO LAS QUERY
						var rollback1 = function(client) {
							client.query('ROLLBACK', function() {
							response.writeHead(400, "Bad Request", {'Content-Type': 'application/json'});
							response.end('{ "description":"wrong parameters" }');
							client.end();
							});
						};
						var rollback = function(client) {
							client.query('ROLLBACK', function() {
							response.writeHead(500, "Query Error", {'Content-Type': 'application/json'});
							response.end('{ "description":"Query Error." }');
							client.end();
							});
						};
						client.query('BEGIN', function(err, results) {
							if(err) return rollback(client);	
							client.query('SELECT iduser FROM sessiontoken  WHERE  localtimestamp(0) < expirationdate AND token =  \'' + token + '\'', function (err, results) {
								if(err) return rollback1(client);
								
								// CHEQUEO SI EL USUARIO EXISTE
								if(results.rowCount == "0") return rollback1(client);
								var iduser = results.rows[0].iduser;
								
								client.query('SELECT * FROM recurrence WHERE idUnit =  \'' + idunit + '\' AND EndDate >= \'' + today + '\'' , function (err, results) {
								
								if(err) return rollback(client);
								
									
										
										client.query('COMMIT', client.end.bind(client));
										response.writeHead(200, "OK", {'Content-Type': 'application/json'});
										response.end( JSON.stringify(results.rows, null, "    ") );
																	
								});
							});	
						});
						

					}
			});
				
				
		} else {
			console.log("[405] " + request.method + " to " + request.url);
			response.writeHead(405, "Method not supported", {'Content-Type': 'application/json'});
			response.end('<html><head><title>405 - Method not supported</title></head><body><h1>Method not supported.</h1></body></html>');
		}
}
function CreateSchedule(pathname, client, response, request){
		//Example of message to be sent (http://localhost:8889/CreateSchedule
		//Arguments:idzone, startdate="YYYY-MM-DD HH:MM:SS", enddate="YYYY-MM-DD", create="TRUE/FALSE", automatic="TRUE/FALSE", idschedule
		//PARA CREAR: token,  idzones= idzone,idzone... ,duration ,days=0,1,2,3,4,5,6 ,time=HH:MM:SS startdate="YYYY-MM-DD ", enddate="YYYY-MM-DD "
		// Response: 200 ok
		//date, start time, duration, array de zonas
		
		client.connect();
		if (request.method == 'POST') {
			console.log("[200] " + request.method + " to " + request.url);
			var fullBody = '';
			
			request.on('data', function(chunk) {
			    fullBody += chunk.toString();
			});
			
			request.on('end', function() {
			
			 
			  
			// parse the received body data
				var decodedBody = querystring.parse(fullBody);			
				var token = querystring.parse(fullBody)["token"];
				var idzones = querystring.parse(fullBody)["idzones"];
				var startdate = querystring.parse(fullBody)["startdate"];
				var duration = querystring.parse(fullBody)["duration"];
				var time = querystring.parse(fullBody)["time"];
				var isrestriction = querystring.parse(fullBody)["isrestriction"];
				var buf = crypto.randomBytes(4)
						
				//VERIFICACION DE LAS VARIABLES
				
					if ( !token   || !idzones || !duration   || !time || !startdate  || !isrestriction  ){
						
						response.writeHead(400, "Bad Request", {'Content-Type': 'application/json'});
						response.end('{ "description":"missing parameters" }');
						
					} else {
					
						//REALIZO LAS QUERY
						var rollback1 = function(client) {
							client.query('ROLLBACK', function() {
							response.writeHead(400, "Bad Request", {'Content-Type': 'application/json'});
							response.end('{ "description":"wrong parameters" }');
							client.end();
							});
						};
						var rollback = function(client) {
							client.query('ROLLBACK', function() {
							response.writeHead(500, "Query Error", {'Content-Type': 'application/json'});
							response.end('{ "description":"Query Error." }');
							client.end();
							});
						};


									client.query('BEGIN', function(err, results) {
										if(err) return rollback(client);	
										client.query('SELECT iduser FROM sessiontoken  WHERE  localtimestamp(0) < expirationdate AND token =  \'' + token + '\'', function (err, results) {
											if(err) return rollback1(client);
											
											// CHEQUEO SI EL USUARIO EXISTE
											if(results.rowCount == "0") return rollback1(client);
											client.query('INSERT INTO schedule(idzone, "time", duration, automatic, idrecurrence, isrestriction, "date", remaining_time) SELECT x, \'' + time + '\', \'' + duration + '\', \'FALSE\',\'' + buf.toString('hex') + '\', \'' + isrestriction + '\', \'' + startdate + '\', \'' + duration + '\' FROM  unnest(ARRAY[' + idzones + ']) x', function (err, results) {
															
															if(err) return rollback(client);
															client.query('COMMIT', client.end.bind(client));
															response.writeHead(200, "OK", {'Content-Type': 'application/json'});
															response.end('');
															
											});
											
										});	
									});
								
						
						


					}
			});
				
				
		} else {
			console.log("[405] " + request.method + " to " + request.url);
			response.writeHead(405, "Method not supported", {'Content-Type': 'application/json'});
			response.end('<html><head><title>405 - Method not supported</title></head><body><h1>Method not supported.</h1></body></html>');
		}

}
function CreateRecurrency(pathname, client, response, request){
		//Example of message to be sent (http://localhost:8889/CreateRecurrency
		//Arguments:idzone, startdate="YYYY-MM-DD HH:MM:SS", enddate="YYYY-MM-DD", create="TRUE/FALSE", automatic="TRUE/FALSE", idschedule
		//PARA CREAR: token,  idzones= idzone,idzone... ,duration ,days=0,1,2,3,4,5,6 ,time=HH:MM:SS startdate="YYYY-MM-DD ", enddate="YYYY-MM-DD "
		// Response: 200 ok
		
		client.connect();
		if (request.method == 'POST') {
			console.log("[200] " + request.method + " to " + request.url);
			var fullBody = '';
			
			request.on('data', function(chunk) {
			    fullBody += chunk.toString();
			});
			
			request.on('end', function() {
			
			 
			  
			// parse the received body data
				var decodedBody = querystring.parse(fullBody);			
				var token = querystring.parse(fullBody)["token"];
				var idzones = querystring.parse(fullBody)["idzones"];
				var startdate = querystring.parse(fullBody)["startdate"];
				var enddate = querystring.parse(fullBody)["enddate"];
				var duration = querystring.parse(fullBody)["duration"];
				var days = querystring.parse(fullBody)["days"];
				var time = querystring.parse(fullBody)["time"];
				var idunit = querystring.parse(fullBody)["idunit"];
				var buf = crypto.randomBytes(4)
				console.log(startdate);
				console.log(enddate);
						
				//VERIFICACION DE LAS VARIABLES
				
					if ( !token   || !idzones || !duration  || !days || !time || !startdate  || !enddate || !idunit  ){
						
						response.writeHead(400, "Bad Request", {'Content-Type': 'application/json'});
						response.end('{ "description":"missing parameters" }');
						
					} else {
					
						//REALIZO LAS QUERY
						var rollback1 = function(client) {
							client.query('ROLLBACK', function() {
							response.writeHead(400, "Bad Request", {'Content-Type': 'application/json'});
							response.end('{ "description":"wrong parameters" }');
							client.end();
							});
						};
						var rollback = function(client) {
							client.query('ROLLBACK', function() {
							response.writeHead(500, "Query Error", {'Content-Type': 'application/json'});
							response.end('{ "description":"Query Error." }');
							client.end();
							});
						};

						var getDate = function(dayOfTheWeek, startDate, endDate){
							daysArray = dayOfTheWeek.split(',');
							var Output = [];
							var salida = [];
							for( var j= 0; j<daysArray.length; j++) {
									var dates = [];
									var today = new Date();
									var newEndDate = endDate.split('-');
									var newStartDate = startDate.split('-');
									var dateToCompare = new Date(newEndDate[0], newEndDate[1] -1, newEndDate[2]);
									var startDateToCompare = new Date(newStartDate[0], newStartDate[1] -1, newStartDate[2]);
									
									for( var i = 1; i<=365; i++){
											if(dateToCompare > today &&  startDateToCompare <= today){
													
													if(today.getDay()== daysArray[j]){
															var dateFormatted = ('\'' + today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate() + '\'');
															if(i == 1 || i == 2 || i == 3 || i == 4 || i == 5 || i == 6 || i == 7 ){
																	var Output =  dateFormatted;
																	dates.push[dateFormatted];
															}else{
																	var Output = Output + ', ' + dateFormatted;
																	dates.push[dateFormatted];
															}
													}
													today.setDate(today.getDate() + 1);
											}else{
													if(today < startDateToCompare){
															today = startDateToCompare;
													}
											}
									}
									if(j == 0 ){
											salida =  Output;
									}else{
											salida = salida + ', ' + Output
									}
							}
					return(salida);
					};
						
						var dates = getDate(days, startdate, enddate)
						console.log(dates);
						
									client.query('BEGIN', function(err, results) {
										if(err) return rollback(client);	
										client.query('SELECT iduser FROM sessiontoken  WHERE  localtimestamp(0) < expirationdate AND token =  \'' + token + '\'', function (err, results) {
											if(err) return rollback1(client);
											
											// CHEQUEO SI EL USUARIO EXISTE
											if(results.rowCount == "0") return rollback1(client);
											client.query('INSERT INTO schedule(idzone, "date", "time", duration, automatic, idrecurrence, isrecurrence, remaining_time) SELECT x, y, \'' + time + '\', \'' + duration + '\', \'FALSE\', \'' + buf.toString('hex') + '\', \'TRUE\', \'' + duration + '\' FROM  unnest(ARRAY[' + idzones + ']) x, unnest( ARRAY[' + dates + ']::date[]) y', function (err, results) {
												if(err) return rollback(client);
												console.log(idzones);
												client.query('INSERT INTO recurrence(idunit, idrecurrence, days, StartDate, EndDate, zones, "time") SELECT \'' + idunit + '\', \'' + buf.toString('hex') + '\', \'' + days + '\', \'' + startdate + '\', \'' + enddate + '\', \'' + idzones + '\', \'' + time + '\'', function (err, results) {
														
															if(err) return rollback(client);
															client.query('COMMIT', client.end.bind(client));
															response.writeHead(200, "OK", {'Content-Type': 'application/json'});
															response.end('');
												});			
											});
											
										});	
									});
								
						
						


					}
			});
				
				
		} else {
			console.log("[405] " + request.method + " to " + request.url);
			response.writeHead(405, "Method not supported", {'Content-Type': 'application/json'});
			response.end('<html><head><title>405 - Method not supported</title></head><body><h1>Method not supported.</h1></body></html>');
		}

}
function DeleteScheduleRecurrence(pathname, client, response, request){
		//Example of message to be sent (http://localhost:8889/CreateDeleteSchedule
		// Arguments: idunit  and token
		// Response: 200 ok
		
			
		
		client.connect();
		if (request.method == 'POST') {
			console.log("[200] " + request.method + " to " + request.url);
			var fullBody = '';
			
			request.on('data', function(chunk) {
			    fullBody += chunk.toString();
			});
			
			request.on('end', function() {
			
			 
			  
			// parse the received body data
				var decodedBody = querystring.parse(fullBody);			
				var token = querystring.parse(fullBody)["token"];

				var recurrence = querystring.parse(fullBody)["recurrence"];
				
				//VERIFICACION DE LAS VARIABLES
				
				if ( !token || !recurrence){
						
						response.writeHead(400, "Bad Request", {'Content-Type': 'application/json'});
						response.end('{ "description":"missing parameters" }');
						
					} else {
					
						//REALIZO LAS QUERY
						var rollback1 = function(client) {
							client.query('ROLLBACK', function() {
							response.writeHead(400, "Bad Request", {'Content-Type': 'application/json'});
							response.end('{ "description":"wrong parameters" }');
							client.end();
							});
						};
						var rollback = function(client) {
							client.query('ROLLBACK', function() {
							response.writeHead(500, "Query Error", {'Content-Type': 'application/json'});
							response.end('{ "description":"Query Error." }');
							client.end();
							});
						};
						client.query('BEGIN', function(err, results) {
							if(err) return rollback(client);	
							client.query('SELECT iduser FROM sessiontoken  WHERE  localtimestamp(0) < expirationdate AND token =  \'' + token + '\'', function (err, results) {
								if(err) return rollback1(client);
								
								// CHEQUEO SI EL USUARIO EXISTE
								if(results.rowCount == "0") return rollback1(client);
								var iduser = results.rows[0].iduser;
								
								client.query('Delete  from schedule WHERE idrecurrence = \'' + recurrence + '\'' , function (err, results) {
								if(err) return rollback(client);
								
									
										
										client.query('COMMIT', client.end.bind(client));
										response.writeHead(200, "OK", {'Content-Type': 'application/json'});
										response.end('');
																	
								});
							});	
						});
						

					}
			});
				
				
		} else {
			console.log("[405] " + request.method + " to " + request.url);
			response.writeHead(405, "Method not supported", {'Content-Type': 'application/json'});
			response.end('<html><head><title>405 - Method not supported</title></head><body><h1>Method not supported.</h1></body></html>');
		}
}

function DeleteSchedule(pathname, client, response, request){
		//Example of message to be sent (http://localhost:8889/CreateDeleteSchedule
		// Arguments: idschedule  and token
		// Response: 200 ok
		
			
		
		client.connect();
		if (request.method == 'POST') {
			console.log("[200] " + request.method + " to " + request.url);
			var fullBody = '';
			
			request.on('data', function(chunk) {
			    fullBody += chunk.toString();
			});
			
			request.on('end', function() {
			
			 
			  
			// parse the received body data
				var decodedBody = querystring.parse(fullBody);			
				var token = querystring.parse(fullBody)["token"];

				var idschedule = querystring.parse(fullBody)["idschedule"];
				
				//VERIFICACION DE LAS VARIABLES
				
				if ( !token || !idschedule){
						
						response.writeHead(400, "Bad Request", {'Content-Type': 'application/json'});
						response.end('{ "description":"missing parameters" }');
						
					} else {
					
						//REALIZO LAS QUERY
						var rollback1 = function(client) {
							client.query('ROLLBACK', function() {
							response.writeHead(400, "Bad Request", {'Content-Type': 'application/json'});
							response.end('{ "description":"wrong parameters" }');
							client.end();
							});
						};
						var rollback = function(client) {
							client.query('ROLLBACK', function() {
							response.writeHead(500, "Query Error", {'Content-Type': 'application/json'});
							response.end('{ "description":"Query Error." }');
							client.end();
							});
						};
						client.query('BEGIN', function(err, results) {
							if(err) return rollback(client);	
							client.query('SELECT iduser FROM sessiontoken  WHERE  localtimestamp(0) < expirationdate AND token =  \'' + token + '\'', function (err, results) {
								if(err) return rollback1(client);
								
								// CHEQUEO SI EL USUARIO EXISTE
								if(results.rowCount == "0") return rollback1(client);
								var iduser = results.rows[0].iduser;
								
								client.query('Delete  from schedule WHERE idschedule = \'' + idschedule + '\'' , function (err, results) {
								if(err) return rollback(client);
								
									
										
										client.query('COMMIT', client.end.bind(client));
										response.writeHead(200, "OK", {'Content-Type': 'application/json'});
										response.end('');
																	
								});
							});	
						});
						

					}
			});
				
				
		} else {
			console.log("[405] " + request.method + " to " + request.url);
			response.writeHead(405, "Method not supported", {'Content-Type': 'application/json'});
			response.end('<html><head><title>405 - Method not supported</title></head><body><h1>Method not supported.</h1></body></html>');
		}
}
function EditRecurrenceSchedule(pathname, client, response, request){
		//Example of message to be sent (http://localhost:8889/EditRecurrenceSchedule
		// Arguments: idschedule  and token
		// Response: 200 ok
		
			
		
		client.connect();
		if (request.method == 'POST') {
			console.log("[200] " + request.method + " to " + request.url);
			var fullBody = '';
			
			request.on('data', function(chunk) {
			    fullBody += chunk.toString();
			});
			
			request.on('end', function() {
			
			 
			  
			// parse the received body data
				var decodedBody = querystring.parse(fullBody);			
				var token = querystring.parse(fullBody)["token"];
				var idzones = querystring.parse(fullBody)["idzones"];
				var startdate = querystring.parse(fullBody)["startdate"];
				var enddate = querystring.parse(fullBody)["enddate"];
				var duration = querystring.parse(fullBody)["duration"];
				var days = querystring.parse(fullBody)["days"];
				var idschedule = querystring.parse(fullBody)["idschedule"];
				var time = querystring.parse(fullBody)["time"];
				var buf = crypto.randomBytes(4)
				console.log(startdate);
				console.log(enddate);
						
				//VERIFICACION DE LAS VARIABLES
				
				
							if ( !token   || !idzones || !duration  || !days || !time || !startdate  || !enddate || !idschedule ){
								
								response.writeHead(400, "Bad Request", {'Content-Type': 'application/json'});
								response.end('{ "description":"missing parameters" }');
								
							} else {
							
								//REALIZO LAS QUERY
								var rollback1 = function(client) {
									client.query('ROLLBACK', function() {
									response.writeHead(400, "Bad Request", {'Content-Type': 'application/json'});
									response.end('{ "description":"wrong parameters" }');
									client.end();
									});
								};
								var rollback = function(client) {
									client.query('ROLLBACK', function() {
									response.writeHead(500, "Query Error", {'Content-Type': 'application/json'});
									response.end('{ "description":"Query Error." }');
									client.end();
									});
								};

								var getDate = function(dayOfTheWeek, startDate, endDate){
									daysArray = dayOfTheWeek.split(',');
									var Output = [];
									var salida = [];
									for( var j= 0; j<daysArray.length; j++) {
											var dates = [];
											var today = new Date();
											var newEndDate = endDate.split('-');
											var newStartDate = startDate.split('-');
											var dateToCompare = new Date(newEndDate[0], newEndDate[1] -1, newEndDate[2]);
											var startDateToCompare = new Date(newStartDate[0], newStartDate[1] -1, newStartDate[2]);
											
											for( var i = 1; i<=365; i++){
													if(dateToCompare > today &&  startDateToCompare <= today){
															
															if(today.getDay()== daysArray[j]){
																	var dateFormatted = ('\'' + today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate() + '\'');
																	if(i == 1 || i == 2 || i == 3 || i == 4 || i == 5 || i == 6 || i == 7 ){
																			var Output =  dateFormatted;
																			dates.push[dateFormatted];
																	}else{
																			var Output = Output + ', ' + dateFormatted;
																			dates.push[dateFormatted];
																	}
															}
															today.setDate(today.getDate() + 1);
													}else{
															if(today < startDateToCompare){
																	today = startDateToCompare;
															}
													}
											}
											if(j == 0 ){
													salida =  Output;
											}else{
													salida = salida + ', ' + Output
											}
									}
							return(salida);
							};
								
								var dates = getDate(days, startdate, enddate)
								console.log(dates);
								
											client.query('BEGIN', function(err, results) {
												if(err) return rollback(client);	
												client.query('SELECT iduser FROM sessiontoken  WHERE  localtimestamp(0) < expirationdate AND token =  \'' + token + '\'', function (err, results) {
													if(err) return rollback1(client);
													
													// CHEQUEO SI EL USUARIO EXISTE
													if(results.rowCount == "0") return rollback1(client);
														client.query('Delete  from schedule WHERE idrecurrence = \'' + idrecurrence + '\' AND date >= \'' + dateNow + '\' AND "time" >= \'' + TimeNow + '\' AND status != \'play\'' , function (err, results) {
														if(err) return rollback(client);
															client.query('INSERT INTO schedule(idzone, "date", "time", duration, automatic, idrecurrence, isrecurrence) SELECT x, y, \'' + time + '\', \'' + duration + '\', \'FALSE\', \'' + buf.toString('hex') + '\', \'TRUE\' FROM  unnest(ARRAY[' + idzones + ']) x, unnest( ARRAY[' + dates + ']::date[]) y', function (err, results) {
																			console.log(err);
																			if(err) return rollback(client);
																			client.query('COMMIT', client.end.bind(client));
																			response.writeHead(200, "OK", {'Content-Type': 'application/json'});
																			response.end('');
																			
															});
														});
												});	
											});
										
								
								


							}
					});
				
		} else {
			console.log("[405] " + request.method + " to " + request.url);
			response.writeHead(405, "Method not supported", {'Content-Type': 'application/json'});
			response.end('<html><head><title>405 - Method not supported</title></head><body><h1>Method not supported.</h1></body></html>');
		}

}
function EditSchedule(pathname, client, response, request){
		//Example of message to be sent (http://localhost:8889/EditSchedule
		// Arguments: idschedule  and token
		// Response: 200 ok
		
			
		
		client.connect();
		if (request.method == 'POST') {
			console.log("[200] " + request.method + " to " + request.url);
			var fullBody = '';
			
			request.on('data', function(chunk) {
			    fullBody += chunk.toString();
			});
			
			request.on('end', function() {
			
			 
			  
			// parse the received body data
				var decodedBody = querystring.parse(fullBody);			
				var token = querystring.parse(fullBody)["token"];
				var idzones = querystring.parse(fullBody)["idzones"];
				var startdate = querystring.parse(fullBody)["startdate"];
				var duration = querystring.parse(fullBody)["duration"];
				var time = querystring.parse(fullBody)["time"];
				var isrestriction = querystring.parse(fullBody)["isrestriction"];
				var idrecurrence = querystring.parse(fullBody)["idrecurrence"];
				var buf = crypto.randomBytes(4)
				var dateNow = (moment(Date.now()).format('YYYY-MM-DD'));
				var TimeNow = (moment(Date.now()).format('HH:mm'));
				console.log(dateNow);
				console.log(TimeNow);
						
				//VERIFICACION DE LAS VARIABLES
				
				
							if ( !token   || !idzones || !duration   || !time || !startdate  || !idrecurrence || !isrestriction ){
								
								response.writeHead(400, "Bad Request", {'Content-Type': 'application/json'});
								response.end('{ "description":"missing parameters" }');
								
							} else {
							
								//REALIZO LAS QUERY
								var rollback1 = function(client) {
									client.query('ROLLBACK', function() {
									response.writeHead(400, "Bad Request", {'Content-Type': 'application/json'});
									response.end('{ "description":"wrong parameters" }');
									client.end();
									});
								};
								var rollback = function(client) {
									client.query('ROLLBACK', function() {
									response.writeHead(500, "Query Error", {'Content-Type': 'application/json'});
									response.end('{ "description":"Query Error." }');
									client.end();
									});
								};

								
								
											client.query('BEGIN', function(err, results) {
												if(err) return rollback(client);	
												client.query('SELECT iduser FROM sessiontoken  WHERE  localtimestamp(0) < expirationdate AND token =  \'' + token + '\'', function (err, results) {
													if(err) return rollback1(client);
													
													// CHEQUEO SI EL USUARIO EXISTE
													if(results.rowCount == "0") return rollback1(client);
														client.query('Delete  from schedule WHERE idrecurrence = \'' + idrecurrence + '\' AND date >= \'' + dateNow + '\' AND "time" >= \'' + TimeNow + '\' AND status != \'play\'' , function (err, results) {
														console.log(err);
														if(err) return rollback(client);
															client.query('INSERT INTO schedule(idzone, "time", duration, automatic, idrecurrence, isrestriction, "date", remaining_time) SELECT x, \'' + time + '\', \'' + duration + '\', \'FALSE\',\'' + buf.toString('hex') + '\', \'' + isrestriction + '\', \'' + startdate + '\', \'' + duration + '\' FROM  unnest(ARRAY[' + idzones + ']) x', function (err, results) {
																			console.log(err);
																			if(err) return rollback(client);
																			client.query('COMMIT', client.end.bind(client));
																			response.writeHead(200, "OK", {'Content-Type': 'application/json'});
																			response.end('');
																			
															});
														});
												});	
											});
										
								
								


							}
					});
				
		} else {
			console.log("[405] " + request.method + " to " + request.url);
			response.writeHead(405, "Method not supported", {'Content-Type': 'application/json'});
			response.end('<html><head><title>405 - Method not supported</title></head><body><h1>Method not supported.</h1></body></html>');
		}

}

//
//
//					SENSOR PATH
//
//
function SensorTxInformation(pathname, client, response, request){

		
		//AGREGAR EL UPTIME Y SI LE DEVUELVO 300 quiere decir que hay un update
		//http://localhost:8889/SensorTxInformation?sensoridentifier=”sensoridentifier”&humidity="humidity"&light="light"&temperature="temperature"&battery="Battery"
		client.connect();
		var String = url.parse(request.url).query;
		var sensoridentifier = querystring.parse(String)["sensoridentifier"];
		var humidity = querystring.parse(String)["humidity"];
		var light = querystring.parse(String)["light"];
		var temperature = querystring.parse(String)["temperature"];
		var battery = querystring.parse(String)["battery"];
		var uptime = querystring.parse(String)["battery"];
		var today = (moment(Date.now()).format('YYYY-MM-DD HH:mm'));
		

		
								var rollback1 = function(client) {
									client.query('ROLLBACK', function() {
									response.writeHead(400, "Bad Request", {'Content-Type': 'application/json'});
									response.end('{ "description":"wrong parameters" }');
									client.end();
									});
								};
								var rollback = function(client) {
									client.query('ROLLBACK', function() {
									response.writeHead(500, "Query Error", {'Content-Type': 'application/json'});
									response.end('{ "description":"Query Error." }');
									client.end();
									});
								};
								var rollback2 = function(client) {
									client.query('ROLLBACK', function() {
									console.log("ENTRO AL ROLLBACK2");
									response.writeHead(300, "Update Needed", {'Content-Type': 'application/json'});
									response.end('{ "description":"Update Needed." }');
									client.end();
									});
								};

								
								
											client.query('BEGIN', function(err, results) {
												if(err) return rollback(client);	
												client.query('INSERT INTO SensorData (idSensor, humidity, light, temperature, date, battery, uptime) Select idSensor, \'' + humidity + '\', \'' + light + '\', \'' + temperature + '\', \'' + today + '\', \'' + battery + '\', \'' + uptime + '\' From Sensor Where sensorIdentifier = \'' + sensoridentifier + '\'', function (err, results) {
													console.log(err);
													if(err) return rollback1(client);
													
													
														client.query('SELECT update from sensor WHERE sensorIdentifier = \'' + sensoridentifier + '\'' , function (err, results) {
														var update = results.rows[0].update;
														console.log(update);
														if (update == true) return rollback2(client);
														if(err) return rollback(client);

																			client.query('COMMIT', client.end.bind(client));
																			response.writeHead(200, "OK", {'Content-Type': 'application/json'});
																			response.end('');
																			
															
														});
												});	
											});

		
}
function SensorRxschedule(pathname, client, response, request){
		//me llega sensoridentifier y le devuelvo todos los schedule del dia
		//http://localhost:8889/SensorRxschedule?sensoridentifier=”sensoridentifier”
		client.connect();
		var String = url.parse(request.url).query;
		var sensoridentifier = querystring.parse(String)["sensoridentifier"];
		var moment = require('moment');

		var date = (moment(Date.now()).format('YYYY-MM-DD'));
		
		
		console.log();
		client.query('SELECT st.token as SensorToken,  sd.duration, sd.date, sd.time FROM   SensorToken st,   Sensor s,  Zone z,  Schedule sd  WHERE   st.sensorIdentifier = \'' + sensoridentifier + '\'   AND s.sensoridentifier = st.sensoridentifier  AND s.idSensor = z.idSensor AND z.idZone = sd.idZone AND sd.date = \'' + date + '\'' , function(err, results) {
						if(err) {
							response.end("Error in query");
							console.log(err);
							client.end();
						}
						if(results.rowCount === 0) {
						console.log('error running query');
						console.log("SCHEDULE NO ENCONTRADO");
						response.end('{"result" : "No Schedule"}');
						client.end();
						} else {
						console.log(results);
						var  Token = JSON.stringify(results.rows[0]["sensortoken"]);
						var Token_prep =  Token.replace(/"/gi, '') ;
						console.log(Token_prep);
						
						
						console.log(results);
						var SPARK = new Sparky({
											deviceId: sensoridentifier,
											token: Token_prep,
										})
						var TOSEND = (results);
						console.log(TOSEND);
								function check() {
								  SPARK.get('zoneschedule', TOSEND);
								  console.log('Informacion enviada al sensor');
								}
						check();
						response.end(JSON.stringify(results.rows, null, "    "));
						client.end();
						}
				});
		
}
//
//
//					CONTROLER PATH
//
//
function ControllerRxstatus(pathname, client, response, request){

		//Example of message to be sent (http://localhost:8889/ControllerRxstatus?idschedule="idschedule")
		client.connect();
		var String = url.parse(request.url).query;
		var idschedule = querystring.parse(String)["idschedule"];


		
								var rollback1 = function(client) {
									client.query('ROLLBACK', function() {
									response.writeHead(400, "Bad Request", {'Content-Type': 'application/json'});
									response.end('{ "description":"wrong parameters" }');
									client.end();
									});
								};
								var rollback = function(client) {
									client.query('ROLLBACK', function() {
									response.writeHead(500, "Query Error", {'Content-Type': 'application/json'});
									response.end('{ "description":"Query Error." }');
									client.end();
									});
								};
								var rollback2 = function(client) {
									client.query('ROLLBACK', function() {
									console.log("ENTRO AL ROLLBACK2");
									response.writeHead(300, "Update Needed", {'Content-Type': 'application/json'});
									response.end('{ "description":"Update Needed." }');
									client.end();
									});
								};

								
								
											client.query('BEGIN', function(err, results) {
												if(err) return rollback(client);	
												client.query('UPDATE schedule  SET status = \'FINISH\', remaining_time = \'0\'  WHERE idschedule = \'' + idschedule + '\'', function (err, results) {
													console.log(err);
													if(err) return rollback1(client);


														client.query('COMMIT', client.end.bind(client));
														response.writeHead(200, "OK", {'Content-Type': 'application/json'});
														response.end('');

												});	
											});

		
}
function ControllerRxschedule(pathname, client, response, request){

		//Example of message to be sent (http://localhost:8889/ControllerRxschedule?unitidentifier="unitidentifier")
		client.connect();
		var String = url.parse(request.url).query;
		var unitidentifier = querystring.parse(String)["unitidentifier"];
		var moment = require('moment');

		var startdate = (moment(Date.now()).format('YYYY-MM-DD'));
		console.log(startdate);
	
		var query = client.query('SELECT s.idSchedule, s.duration, s.date, s.time, z.zone FROM 	Zone z, Schedule s,  unit u WHERE u.unitidentifier =  \'' + unitidentifier + '\'AND u.idUnit = z.idUnit AND z.idzone = s.idzone AND s.date = \'' + startdate + '\'');
		
		query.on("row", function (row, results) {
			results.addRow(row);
		});
		query.on("end", function (results) {
			if(results.rowCount === 0) {
				console.log('error running query');
				response.end('{"result" : "Error no Schedule has been set"}');
				client.end();
			} else {
				console.log(JSON.stringify(results.rows, null, "    "));
				response.end(JSON.stringify(results.rows, null, "    "));
				client.end();
			}
		});
}
function ControllerRxirrigate(pathname, client, response, request){

//http://localhost:8889/ControllerRxirrigate?unitidentifier=”unitidentifier”&irrigate=HIGH/DOWN&zone="XX"
		client.connect();
		var String = url.parse(request.url).query;
		var unitidentifier = querystring.parse(String)["unitidentifier"];
		var irrigate = querystring.parse(String)["irrigate"];
		var zone = querystring.parse(String)["zone"];
		var moment = require('moment');


		console.log();
		client.query('SELECT ut.token as UnitToken   FROM   unittoken ut,    unit u  WHERE ut.unitidentifier = \'' + unitidentifier + '\' AND u.unitidentifier = ut.unitidentifier ' , function(err, results) {
						if(err) {
							response.end("Error in query");
							console.log(err);
							client.end();
						}
						console.log(results);
						if(results.rowCount === 0) {
							response.end("Error in query no hay unit asociado");
							console.log(err);
							client.end();
						} else {
							var  Token = JSON.stringify(results.rows[0]["unittoken"]);
							var Token_prep =  Token.replace(/"/gi, '');
							console.log(Token_prep);
							
							
							console.log(results);
							var SPARK = new Sparky({
												deviceId: unitidentifier,
												token: Token_prep,
											})
							var TOSEND = (zone + "," + irrigate);
							console.log(irrigate);
									function check() {
									  SPARK.get('relay', TOSEND);
									  console.log('Informacion enviada al controlador');
									}
							check();
							response.end(JSON.stringify(results.rows, null, "    ") + irrigate);
							client.end();
						}
				});
		
}
function PauseSchedule(pathname, client, response, request){
		//Example (http://localhost:8889/PauseSchedule
		// Arguments: token , idzone
		// Response: ok
		
		client.connect();
		if (request.method == 'POST') {
			console.log("[200] " + request.method + " to " + request.url);
			var fullBody = '';
			
			request.on('data', function(chunk) {
			    fullBody += chunk.toString();
			});
			
			request.on('end', function() {
			
			 
			  
			// parse the received body data
				var decodedBody = querystring.parse(fullBody);			
				var token = querystring.parse(fullBody)["token"];
				var idschedule = querystring.parse(fullBody)["idschedule"];
				console.log(token);
				
				
				
				
				//VERIFICACION DE LAS VARIABLES
				
				if (!token || !idschedule ){
						
						response.writeHead(400, "Bad Request", {'Content-Type': 'application/json'});
						response.end('{ "description":"missing parameters" }');
						
					} else {
					
						//REALIZO LAS QUERY
						var rollback = function(client) {
							client.query('ROLLBACK', function() {
							response.writeHead(500, "Query Error", {'Content-Type': 'application/json'});
							response.end('{ "description":"Query Error." }');
							client.end();
							});
						};
						var rollback1 = function(client) {
							client.query('ROLLBACK', function() {
							response.writeHead(400, "Bad Request", {'Content-Type': 'application/json'});
							response.end('{ "description":"wrong parameters" }');
							client.end();
							});
						};
						var rollback3 = function(client, SparkData) {
							client.query('ROLLBACK', function() {
							response.writeHead(500, "Unit is not irrigating", {'Content-Type': 'application/json'});
							response.end(SparkData);
							client.end();
							});
						};
						var rollback4 = function(client, err) {
							client.query('ROLLBACK', function() {
							response.writeHead(501, "Unit offline", {'Content-Type': 'application/json'});
							response.end(err);
							client.end();
							});
						};
						client.query('BEGIN', function(err, results) {
							if(err) return rollback(client);	
							client.query('SELECT iduser FROM sessiontoken  WHERE  localtimestamp(0) < expirationdate AND token =  \'' + token + '\'', function (err, results) {
								if(err) return rollback1(client);
								
								// CHEQUEO SI EL USUARIO EXISTE
								if(results.rowCount == "0") return rollback1(client);
								var iduser = results.rows[0].iduser;
								//HACER EL PEDIDO AL SERVER Y POPULAR CON EL REMAINING TIME EN LA BASE
								client.query('SELECT ut.token as unittoken, z.zone as zone, u.unitidentifier as unitidentifier  FROM   unittoken ut, unit u, zone z, schedule s  WHERE s.idschedule = \'' + idschedule + '\' AND s.idzone = z.idzone   AND z.idunit = u.idunit  AND u.unitidentifier = ut.unitidentifier' , function (err, results) {
									console.log(err);
									if(err) return rollback(client);
									if(results.rowCount == "0") return rollback(client);
									var unittoken = results.rows[0].unittoken;
									var zone = results.rows[0].zone;
									var unitidentifier = results.rows[0].unitidentifier;
									
									connectunit.controler(unittoken, unitidentifier, function(err, SparkData){
										if(err) return rollback4(client,err);
										var Sparkdataparseado = JSON.stringify(SparkData);
										var  remaining_time = JSON.stringify(SparkData["remaining_time"]);
										console.log(remaining_time);
										if(JSON.stringify(SparkData["Irrigating"]) == '"0"') return rollback3(client,Sparkdataparseado);
								
								 
										var remaining_time_prep =  remaining_time.replace(/"/gi, '');
										console.log(remaining_time_prep);
									client.query('UPDATE schedule  SET status = \'PAUSE\', remaining_time = \'' + remaining_time_prep + '\'  WHERE idschedule = \'' + idschedule + '\'' , function (err, results) {
										console.log(err);
										if(err) return rollback(client);

												
												
														if (zone.length == '1') zone = ('0'+zone);
														var SPARK = new Sparky({
																deviceId: unitidentifier,
																token: unittoken,
															})
														console.log(SPARK);
														var TOSEND = (zone + ",DOWN");
														console.log(TOSEND);
														function check() {
															SPARK.run('relay', TOSEND);
															console.log('Informacion enviada al controlador');
																}
														check();
														
														client.query('COMMIT', client.end.bind(client));
														response.writeHead(200, "OK", {'Content-Type': 'application/json'});
														response.end('');
																				
											});
									});
								});
							});	
						});
						

					}
			});
				
				
		} else {
			console.log("[405] " + request.method + " to " + request.url);
			response.writeHead(405, "Method not supported", {'Content-Type': 'application/json'});
			response.end('<html><head><title>405 - Method not supported</title></head><body><h1>Method not supported.</h1></body></html>');
		}
}
function PlayZone(pathname, client, response, request){
		//Example (http://localhost:8889/PlayZone
		// Arguments: token , idzone, duration
		// Response: ok
		
		client.connect();
		if (request.method == 'POST') {
			console.log("[200] " + request.method + " to " + request.url);
			var fullBody = '';
			
			request.on('data', function(chunk) {
			    fullBody += chunk.toString();
			});
			
			request.on('end', function() {
			
			 
			  
			// parse the received body data
				var decodedBody = querystring.parse(fullBody);			
				var token = querystring.parse(fullBody)["token"];
				var idzone = querystring.parse(fullBody)["idzone"];
				var duration = querystring.parse(fullBody)["duration"];
				var dateNow = (moment(Date.now()).format('YYYY-MM-DD'));
				var TimeNow = (moment(Date.now()).format('HH:mm'));
				
				var buf = crypto.randomBytes(4)

				//VERIFICACION DE LAS VARIABLES
				
				if (!token || !idzone || !duration){
						
						response.writeHead(400, "Bad Request", {'Content-Type': 'application/json'});
						response.end('{ "description":"missing parameters" }');
						
					} else {
					
						//REALIZO LAS QUERY
						var rollback1 = function(client) {
							client.query('ROLLBACK', function() {
							response.writeHead(400, "Bad Request", {'Content-Type': 'application/json'});
							response.end('{ "description":"wrong parameters" }');
							client.end();
							});
						};
						var rollback = function(client) {
							client.query('ROLLBACK', function() {
							response.writeHead(500, "Query Error", {'Content-Type': 'application/json'});
							response.end('{ "description":"Query Error." }');
							client.end();
							});
						};
						var rollback2 = function(client) {
							client.query('ROLLBACK', function() {
							response.writeHead(500, "Query Error", {'Content-Type': 'application/json'});
							response.end('{ "description":"Unitidentifier invalid." }');
							client.end();
							});
						};
						var rollback3 = function(client, SparkData) {
							client.query('ROLLBACK', function() {
							response.writeHead(500, "Query Error", {'Content-Type': 'application/json'});
							response.end(SparkData);
							client.end();
							});
						};
						var rollback4 = function(client, err) {
							client.query('ROLLBACK', function() {
							response.writeHead(501, "Unit offline", {'Content-Type': 'application/json'});
							response.end(err);
							client.end();
							});
						};
						client.query('BEGIN', function(err, results) {
							if(err) return rollback(client);	
							client.query('SELECT iduser FROM sessiontoken  WHERE  localtimestamp(0) < expirationdate AND token =  \'' + token + '\'', function (err, results) {
								
								if(err) return rollback1(client);
								
								// CHEQUEO SI EL USUARIO EXISTE
								
								if(results.rowCount == "0") return rollback1(client);
								var iduser = results.rows[0].iduser;
								
								client.query('SELECT ut.token as unittoken, z.zone as zone, u.unitidentifier as unitidentifier  FROM   unittoken ut, unit u, zone z  WHERE z.idzone = \'' + idzone + '\'  AND z.idunit = u.idunit  AND u.unitidentifier = ut.unitidentifier' , function (err, results) {
								
								if(err) return rollback(client);
								if(results.rowCount == "0") return rollback2(client);
								var unittoken = results.rows[0].unittoken;
								var zone = results.rows[0].zone;
								var unitidentifier = results.rows[0].unitidentifier;
								//VER COMO HACER PARA QUE FRENE Y ESPERE LA RESPUESTA DEL UNIT
								connectunit.controler(unittoken, unitidentifier, function(err, SparkData){
								console.log('ESTO ES ERR ' +err);
								if(err) return rollback4(client,err);
								console.log('ESTO ES SPARKDATA ' + SparkData);
								console.log('ESTO ES SPARKDATA.IRRIGATING ' + SparkData.Irrigating);
								var Sparkdataparseado = JSON.stringify(SparkData);
								console.log('ESTO ES Sparkdataparseado ' + Sparkdataparseado);
								console.log('ESTO ES Sparkdataparseado.Irrigating ' + JSON.stringify(SparkData["Irrigating"]));
								var  Irrigating = JSON.stringify(SparkData["Irrigating"]);
								if(JSON.stringify(SparkData["Irrigating"]) == '"1"') return rollback3(client,Sparkdataparseado);
								
									
										client.query('INSERT INTO schedule(idzone, "time", duration, automatic, idrecurrence, isrestriction, "date", remaining_time) SELECT \'' + idzone + '\', \'' + TimeNow + '\', \'' + duration + '\', \'FALSE\',\'' + buf.toString('hex') + '\',  \'FALSE\', \'' + dateNow +'\', \'' + duration + '\'', function (err, results) {

											console.log(zone.length);
											if (zone.length == '1') zone = ('0'+zone);
											if (duration.length == '1') duration = ('0'+duration);

											
											var SPARK = new Sparky({
													deviceId: unitidentifier,
													token: unittoken,
												})
											var TOSEND = (zone + ",HIGH," + duration);
											console.log(TOSEND);
										
											function check() {
												SPARK.run('relay', TOSEND);
												console.log('Informacion enviada al controlador');
													}
											check();
											
											client.query('COMMIT', client.end.bind(client));
											response.writeHead(200, "OK", {'Content-Type': 'application/json'});
											response.end('');
										});							
									});
								});
							});	
						});
						

					}
			});
				
				
		} else {
			console.log("[405] " + request.method + " to " + request.url);
			response.writeHead(405, "Method not supported", {'Content-Type': 'application/json'});
			response.end('<html><head><title>405 - Method not supported</title></head><body><h1>Method not supported.</h1></body></html>');
		}
}
function PlaySchedule(pathname, client, response, request){
		//Example (http://localhost:8889/PlaySchedule
		// Arguments: token , idzone, duration
		// Response: ok
		
		client.connect();
		if (request.method == 'POST') {
			console.log("[200] " + request.method + " to " + request.url);
			var fullBody = '';
			
			request.on('data', function(chunk) {
			    fullBody += chunk.toString();
			});
			
			request.on('end', function() {
			
			 
			  
			// parse the received body data
				var decodedBody = querystring.parse(fullBody);			
				var token = querystring.parse(fullBody)["token"];
				var idschedule = querystring.parse(fullBody)["idschedule"];
				var dateNow = (moment(Date.now()).format('YYYY-MM-DD'));
				var TimeNow = (moment(Date.now()).format('HH:mm'));
				
				var buf = crypto.randomBytes(4)

				//VERIFICACION DE LAS VARIABLES
				
				if (!token || !idschedule ){
						
						response.writeHead(400, "Bad Request", {'Content-Type': 'application/json'});
						response.end('{ "description":"missing parameters" }');
						
					} else {
					
						//REALIZO LAS QUERY
						var rollback1 = function(client) {
							client.query('ROLLBACK', function() {
							response.writeHead(400, "Bad Request", {'Content-Type': 'application/json'});
							response.end('{ "description":"wrong parameters" }');
							client.end();
							});
						};
						var rollback = function(client) {
							client.query('ROLLBACK', function() {
							response.writeHead(500, "Query Error", {'Content-Type': 'application/json'});
							response.end('{ "description":"Query Error." }');
							client.end();
							});
						};
						var rollback2 = function(client) {
							client.query('ROLLBACK', function() {
							response.writeHead(500, "Query Error", {'Content-Type': 'application/json'});
							response.end('{ "description":"Idschedule invalid." }');
							client.end();
							});
						};
						var rollback3 = function(client, SparkData) {
							client.query('ROLLBACK', function() {
							response.writeHead(500, "Unit is irrigating", {'Content-Type': 'application/json'});
							response.end(SparkData);
							client.end();
							});
						};
						var rollback4 = function(client, err) {
							client.query('ROLLBACK', function() {
							response.writeHead(501, "Unit offline", {'Content-Type': 'application/json'});
							response.end(err);
							client.end();
							});
						};
						client.query('BEGIN', function(err, results) {
							if(err) return rollback(client);	
							client.query('SELECT iduser FROM sessiontoken  WHERE  localtimestamp(0) < expirationdate AND token =  \'' + token + '\'', function (err, results) {
								
								if(err) return rollback1(client);
								
								// CHEQUEO SI EL USUARIO EXISTE
								if(results.rowCount == "0") return rollback1(client);
								var iduser = results.rows[0].iduser;
								
								client.query('SELECT ut.token as unittoken, z.zone as zone, u.unitidentifier as unitidentifier, s.duration as durations, s.status as status, s.remaining_time as remaining_time  FROM   unittoken ut, unit u, zone z , schedule s  WHERE s.idschedule = \'' + idschedule + '\' AND s.idzone = z.idzone   AND z.idunit = u.idunit  AND u.unitidentifier = ut.unitidentifier' , function (err, results) {
								
									if(err) return rollback(client);
									if(results.rowCount == "0") return rollback2(client);
									var unittoken = results.rows[0].unittoken;
									var zone = results.rows[0].zone;
									var duration = results.rows[0].duration;
									var unitidentifier = results.rows[0].unitidentifier;
									var status = results.rows[0].status;
									var remaining_time = results.rows[0].remaining_time;
									
									if(status == "PLAY" || status == "PAUSE") {
									//SI ESTA EN PLAY le voy a devolver el sparkdata con los datos. Y si esta en PAUSE le tengo que enviar al unit el remaining_time
										connectunit.controler(unittoken, unitidentifier, function(err, SparkData){
											if(err) return rollback4(client,err);
											var Sparkdataparseado = JSON.stringify(SparkData);
											var  Irrigating = JSON.stringify(SparkData["Irrigating"]);
											if(JSON.stringify(SparkData["Irrigating"]) == '"1"') return rollback3(client,Sparkdataparseado);

										
											client.query('UPDATE schedule  SET status = \'PLAY\', "date" = \'' + dateNow + '\', "time" = \'' + TimeNow + '\'  WHERE idschedule = \'' + idschedule + '\'', function (err, results) {
											console.log(err);
										
												if (zone.length == '1') zone = ('0'+zone);
												if (remaining_time.length == '1') remaining_time = ('0'+remaining_time);

												var SPARK = new Sparky({
														deviceId: unitidentifier,
														token: unittoken,
													})
												var TOSEND = (zone + ",HIGH," + remaining_time);
												
											
												function check() {
													SPARK.run('relay', TOSEND);
													console.log('Informacion enviada al controlador');
														}
												check();
												
												client.query('COMMIT', client.end.bind(client));
												response.writeHead(200, "OK", {'Content-Type': 'application/json'});
												response.end('');
																		
											});
										});
									} else {
									//MANDO EL DURATION
								
							
										connectunit.controler(unittoken, unitidentifier, function(err, SparkData){
											if(err) return rollback4(client,err);
											var Sparkdataparseado = JSON.stringify(SparkData);
											var  Irrigating = JSON.stringify(SparkData["Irrigating"]);
											if(JSON.stringify(SparkData["Irrigating"]) == '"HIGH"') return rollback3(client,Sparkdataparseado);

										
											client.query('UPDATE schedule  SET status = \'PLAY\', "date" = \'' + dateNow + '\', "time" = \'' + TimeNow + '\'  WHERE idschedule = \'' + idschedule + '\'', function (err, results) {
											console.log(err);
										
												if (zone.length == '1') zone = ('0'+zone);
												if (duration.length == '1') duration = ('0'+duration);

												var SPARK = new Sparky({
														deviceId: unitidentifier,
														token: unittoken,
													})
												var TOSEND = (zone + ",HIGH," + duration);
												
											
												function check() {
													SPARK.run('relay', TOSEND);
													console.log('Informacion enviada al controlador');
														}
												check();
												
												client.query('COMMIT', client.end.bind(client));
												response.writeHead(200, "OK", {'Content-Type': 'application/json'});
												response.end('');
																		
											});
										});
									}
								});
							});	
						});
						

					}
			});
				
				
		} else {
			console.log("[405] " + request.method + " to " + request.url);
			response.writeHead(405, "Method not supported", {'Content-Type': 'application/json'});
			response.end('<html><head><title>405 - Method not supported</title></head><body><h1>Method not supported.</h1></body></html>');
		}
}
//
//
//					SOILD GRASS SYSTEM PATH
//
//

function getSoiltype(pathname, client, response, request){
		//Example (http://localhost:8889/getSoiltype
		// Arguments: token
		// Response: SoilType
		
		client.connect();
		if (request.method == 'POST') {
			console.log("[200] " + request.method + " to " + request.url);
			var fullBody = '';
			
			request.on('data', function(chunk) {
			    fullBody += chunk.toString();
			});
			
			request.on('end', function() {
			
			 
			  
			// parse the received body data
				var decodedBody = querystring.parse(fullBody);			
				var token = querystring.parse(fullBody)["token"];
				
				
				//VERIFICACION DE LAS VARIABLES
				
				if (!token ){
						
						response.writeHead(400, "Bad Request", {'Content-Type': 'application/json'});
						response.end('{ "description":"missing parameters" }');
						
					} else {
					
						//REALIZO LAS QUERY
						var rollback1 = function(client) {
							client.query('ROLLBACK', function() {
							response.writeHead(400, "Bad Request", {'Content-Type': 'application/json'});
							response.end('{ "description":"wrong parameters" }');
							client.end();
							});
						};
						var rollback = function(client) {
							client.query('ROLLBACK', function() {
							response.writeHead(500, "Query Error", {'Content-Type': 'application/json'});
							response.end('{ "description":"Query Error." }');
							client.end();
							});
						};
						client.query('BEGIN', function(err, results) {
							if(err) return rollback(client);	
							client.query('SELECT iduser FROM sessiontoken  WHERE  localtimestamp(0) < expirationdate AND token =  \'' + token + '\'', function (err, results) {
								if(err) return rollback1(client);
								
								// CHEQUEO SI EL USUARIO EXISTE
								if(results.rowCount == "0") return rollback1(client);
								var iduser = results.rows[0].iduser;
								
								client.query('SELECT * FROM soiltype' , function (err, results) {
								if(err) return rollback(client);
								
									
										
										client.query('COMMIT', client.end.bind(client));
										response.writeHead(200, "OK", {'Content-Type': 'application/json'});
										response.end( JSON.stringify(results.rows, null, "    "));
																	
								});
							});	
						});
						

					}
			});
				
				
		} else {
			console.log("[405] " + request.method + " to " + request.url);
			response.writeHead(405, "Method not supported", {'Content-Type': 'application/json'});
			response.end('<html><head><title>405 - Method not supported</title></head><body><h1>Method not supported.</h1></body></html>');
		}
}
function getSystemtype(pathname, client, response, request){
		//Example (http://localhost:8889/getSystemtype
		// Arguments: token
		// Response: systemtype
		
		client.connect();
		if (request.method == 'POST') {
			console.log("[200] " + request.method + " to " + request.url);
			var fullBody = '';
			
			request.on('data', function(chunk) {
			    fullBody += chunk.toString();
			});
			
			request.on('end', function() {
			
			 
			  
			// parse the received body data
				var decodedBody = querystring.parse(fullBody);			
				var token = querystring.parse(fullBody)["token"];
				
				
				//VERIFICACION DE LAS VARIABLES
				
				if (!token ){
						
						response.writeHead(400, "Bad Request", {'Content-Type': 'application/json'});
						response.end('{ "description":"missing parameters" }');
						
					} else {
					
						//REALIZO LAS QUERY
						var rollback1 = function(client) {
							client.query('ROLLBACK', function() {
							response.writeHead(400, "Bad Request", {'Content-Type': 'application/json'});
							response.end('{ "description":"wrong parameters" }');
							client.end();
							});
						};
						var rollback = function(client) {
							client.query('ROLLBACK', function() {
							response.writeHead(500, "Query Error", {'Content-Type': 'application/json'});
							response.end('{ "description":"Query Error." }');
							client.end();
							});
						};
						client.query('BEGIN', function(err, results) {
							if(err) return rollback(client);	
							client.query('SELECT iduser FROM sessiontoken  WHERE  localtimestamp(0) < expirationdate AND token =  \'' + token + '\'', function (err, results) {
								if(err) return rollback1(client);
								
								// CHEQUEO SI EL USUARIO EXISTE
								if(results.rowCount == "0") return rollback1(client);
								var iduser = results.rows[0].iduser;
								
								client.query('SELECT * FROM systemtype' , function (err, results) {
								if(err) return rollback(client);
								
									
										
										client.query('COMMIT', client.end.bind(client));
										response.writeHead(200, "OK", {'Content-Type': 'application/json'});
										response.end( JSON.stringify(results.rows, null, "    ") );
																	
								});
							});	
						});
						

					}
			});
				
				
		} else {
			console.log("[405] " + request.method + " to " + request.url);
			response.writeHead(405, "Method not supported", {'Content-Type': 'application/json'});
			response.end('<html><head><title>405 - Method not supported</title></head><body><h1>Method not supported.</h1></body></html>');
		}
}
function getGrasstype(pathname, client, response, request){
		//Example (http://localhost:8889/getGrasstype
		// Arguments: token
		// Response: Grass type
		
		client.connect();
		if (request.method == 'POST') {
			console.log("[200] " + request.method + " to " + request.url);
			var fullBody = '';
			
			request.on('data', function(chunk) {
			    fullBody += chunk.toString();
			});
			
			request.on('end', function() {
			
			 
			  
			// parse the received body data
				var decodedBody = querystring.parse(fullBody);			
				var token = querystring.parse(fullBody)["token"];
				
				
				//VERIFICACION DE LAS VARIABLES
				
				if (!token ){
						
						response.writeHead(400, "Bad Request", {'Content-Type': 'application/json'});
						response.end('{ "description":"missing parameters" }');
						
					} else {
					
						//REALIZO LAS QUERY
						var rollback1 = function(client) {
							client.query('ROLLBACK', function() {
							response.writeHead(400, "Bad Request", {'Content-Type': 'application/json'});
							response.end('{ "description":"wrong parameters" }');
							client.end();
							});
						};
						var rollback = function(client) {
							client.query('ROLLBACK', function() {
							response.writeHead(500, "Query Error", {'Content-Type': 'application/json'});
							response.end('{ "description":"Query Error." }');
							client.end();
							});
						};
						client.query('BEGIN', function(err, results) {
							if(err) return rollback(client);	
							client.query('SELECT iduser FROM sessiontoken  WHERE  localtimestamp(0) < expirationdate AND token =  \'' + token + '\'', function (err, results) {
								if(err) return rollback1(client);
								
								// CHEQUEO SI EL USUARIO EXISTE
								if(results.rowCount == "0") return rollback1(client);
								var iduser = results.rows[0].iduser;
								
								client.query('SELECT * FROM grasstype' , function (err, results) {
								if(err) return rollback(client);
								
									
										
										client.query('COMMIT', client.end.bind(client));
										response.writeHead(200, "OK", {'Content-Type': 'application/json'});
										response.end( JSON.stringify(results.rows, null, "    ") );
																	
								});
							});	
						});
						

					}
			});
				
				
		} else {
			console.log("[405] " + request.method + " to " + request.url);
			response.writeHead(405, "Method not supported", {'Content-Type': 'application/json'});
			response.end('<html><head><title>405 - Method not supported</title></head><body><h1>Method not supported.</h1></body></html>');
		}
}
function getSoilgrasssystemdata(pathname, client, response, request){
		//Example (http://localhost:8889/getgetSoilgrasssystemdata?idsoil="idsoil"&idgrass="idgrass"&idsystem="idsystem"
		// Arguments: idsoil idgrass idsystem and token
		// Response: Soild grass system info
		
		client.connect();
		if (request.method == 'POST') {
			console.log("[200] " + request.method + " to " + request.url);
			var fullBody = '';
			
			request.on('data', function(chunk) {
			    fullBody += chunk.toString();
			});
			
			request.on('end', function() {
			
			 
			  
			// parse the received body data
				var decodedBody = querystring.parse(fullBody);			
				var token = querystring.parse(fullBody)["token"];
				var idsoil = querystring.parse(fullBody)["idsoil"];
				var idgrass = querystring.parse(fullBody)["idgrass"];
				var idsystem = querystring.parse(fullBody)["idsystem"];
				
				//VERIFICACION DE LAS VARIABLES
				
				if (!token || !idsoil || !idgrass || !idsystem ){
						
						response.writeHead(400, "Bad Request", {'Content-Type': 'application/json'});
						response.end('{ "description":"missing parameters" }');
						
					} else {
					
						//REALIZO LAS QUERY
						var rollback1 = function(client) {
							client.query('ROLLBACK', function() {
							response.writeHead(400, "Bad Request", {'Content-Type': 'application/json'});
							response.end('{ "description":"wrong parameters" }');
							client.end();
							});
						};
						var rollback = function(client) {
							client.query('ROLLBACK', function() {
							response.writeHead(500, "Query Error", {'Content-Type': 'application/json'});
							response.end('{ "description":"Query Error." }');
							client.end();
							});
						};
						client.query('BEGIN', function(err, results) {
							if(err) return rollback(client);	
							client.query('SELECT iduser FROM sessiontoken  WHERE  localtimestamp(0) < expirationdate AND token =  \'' + token + '\'', function (err, results) {
								if(err) return rollback1(client);
								
								// CHEQUEO SI EL USUARIO EXISTE
								if(results.rowCount == "0") return rollback1(client);
								var iduser = results.rows[0].iduser;
								
								client.query('SELECT * FROM soilgrasssystemdata WHERE idsoil = \'' + idsoil + '\' AND idgrass = \'' + idgrass + '\' AND idsystem = \'' + idsystem + '\'' , function (err, results) {
								if(err) return rollback(client);
								
									
										
										client.query('COMMIT', client.end.bind(client));
										response.writeHead(200, "OK", {'Content-Type': 'application/json'});
										response.end( JSON.stringify(results.rows, null, "    ") );
																	
								});
							});	
						});
						

					}
			});
				
				
		} else {
			console.log("[405] " + request.method + " to " + request.url);
			response.writeHead(405, "Method not supported", {'Content-Type': 'application/json'});
			response.end('<html><head><title>405 - Method not supported</title></head><body><h1>Method not supported.</h1></body></html>');
		}

}