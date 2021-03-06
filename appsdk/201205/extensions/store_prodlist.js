/* **************************************************************

   Copyright 2011 Zoovy, Inc.

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.

************************************************************** */

/*
An extension for acquiring and displaying 'lists' of product data.
The functions here are designed to work with 'reasonable' size lists of product.
There are instances where a list may get looped through more than once to display the product. if several hundred product are present, it will get slow.
that being said, it's written to take a list of several hundred and break it into multiple pages. This makes for a better user experience.
currently, sorting is not available as part of the multipage header. ###
*/


var store_prodlist = function() {
	var r = {
	vars : {
		forgetme : {} //used to store an object of pids (key) for items that don't show in the prodlist. value can be app specific. TS makes sense.
		},

					////////////////////////////////////   CALLS    \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\		



	calls : {

/*
getProd includes all general product attributes (name, desc, base_price, etc)
 -> does include reviews.
 -> no inventory or options.
*/
		getProd : {
			init : function(pid,tagObj,Q)	{
				var r = 0; //will return # of requests, if any. if zero is returned, all data needed was in local.
//				myControl.util.dump("BEGIN myControl.ext.store_prodlist.calls.getProd");
//				myControl.util.dump(" -> PID: "+pid);
//datapointer must be added here because it needs to be passed into the callback, which may get executed without ever going in to dispatch() if the data is local
// This also overrides the datapointer, if set. This is for consistency's sake.
// The advantage of saving the data in memory and local storage is lost if the datapointer isn't consistent, especially for product data.
				tagObj = $.isEmptyObject(tagObj) ? {} : tagObj; 
				tagObj["datapointer"] = "getProduct|"+pid; 
//fetchData checks the timestamp, so no need to doublecheck it here unless there's a need to make sure it is newer than what is specified (1 day) in the fetchData function				
				if(myControl.model.fetchData('getProduct|'+pid) == false)	{
					r = 2;
					this.dispatch(pid,tagObj,Q);
					}
				else	{
					myControl.util.handleCallback(tagObj)
					}
				return r;
				},
			dispatch : function(pid,tagObj,Q)	{
				var obj = {};
				obj["_cmd"] = "getProduct";
				obj["pid"] = pid;
				obj["_tag"] = tagObj;
				myControl.model.addDispatchToQ(obj,Q);
				}
			}, //getProd

		getReviews : {
			init : function(pid,tagObj,Q)	{
				var r = 0; //will return a 1 or a 0 based on whether the item is in local storage or not, respectively.

				tagObj = $.isEmptyObject(tagObj) ? {} : tagObj;
				tagObj["datapointer"] = "getReviews|"+pid;

				if(myControl.model.fetchData('getReviews|'+pid) == false)	{
					r = 1;
					this.dispatch(pid,tagObj,Q)
					}
				else	{
					myControl.util.handleCallback(tagObj)
					}
				return r;
				},
			dispatch : function(pid,tagObj,Q)	{
				myControl.model.addDispatchToQ({"_cmd":"getReviews","pid":pid,"_tag" : tagObj},Q);	
				}
			}//getReviews

		}, //calls









					////////////////////////////////////   CALLBACKS    \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\









	callbacks : {
//callbacks.init need to return either a true or a false, depending on whether or not the file will execute properly based on store account configuration.
		init : {
			onSuccess : function()	{
//				myControl.util.dump('BEGIN myControl.ext.store_prodlist.init.onSuccess ');
				return true;  //currently, there are no config or extension dependencies, so just return true. may change later.
//				myControl.util.dump('END myControl.ext.store_prodlist.init.onSuccess');
				},
			onError : function()	{
				myControl.util.dump('BEGIN myControl.ext.store_prodlist.callbacks.init.onError');
				}
			},
		translateTemplate : {
			onSuccess : function(tagObj)	{
//				myControl.util.dump("BEGIN myControl.ext.store_prodlist.callbacks.translateTemplate.onSuccess");
//				myControl.util.dump(tagObj);
//				myControl.util.dump(" -> tagObj.datapointer = "+tagObj.datapointer);
//				myControl.util.dump(" -> tagObj.parentID = "+tagObj.parentID);
				myControl.renderFunctions.translateTemplate(myControl.data[tagObj.datapointer],tagObj.parentID);
				},
			onError : function(d)	{
				$('#globalMessaging').append(myControl.util.getResponseErrors(d)).toggle(true);
				}
			}

		}, //callbacks







						////////////////////////////////////   RENDERFORMATS    \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\





		renderFormats : {
			mpPagesAsListItems : function($tag,data)	{
//				myControl.util.dump('BEGIN myControl.ext.store_prodlist.renderFormats.mpPagesAsListItems');
				var o = '';
				for(i = 1; i <= data.value; i += 1)	{
					o += "<li class='mpControlJumpToPage' data-page='"+i+"'><span>page: "+i+"<\/span><\/li>"; //data-page is used for MP 'jumping'. don't use index or .text because order and text could get changed.
					}
				$tag.append(o);		
				}
			},


////////////////////////////////////   						utilities			    \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\


		util : {
/*
this will go get ALL product in the csv passed (if not in memory or local already).
any trimming to keep request size down should be done outside this function.
product will be added to DOM IF parentID is set.

this function is designed around getting product for a product list that will be displayed in the DOM.
tagObj is not a passable param for this reason. specific callbacks are used.


*/
			getProductDataForList : function(csv,parentID)	{
//				myControl.util.dump("BEGIN myControl.ext.store_prodlist.util.getProductDataForList");
//				myControl.util.dump("csv = "+csv);
				var $parent = $('#'+parentID).removeClass('loadingBG'); //do not empty here. may contain MP controls by this point.
				var numRequests = 0; //# of product in local/memory. no strictly necessary, but used for testing.
				var L = csv.length;
//				myControl.util.dump(' -> # of product = '+L);
				for(var i = 0; i < L; i += 1)	{
					$parent.append(myControl.renderFunctions.createTemplateInstance(myControl.ext.store_prodlist.vars[parentID].templateID,{"id":parentID+"_"+csv[i],"pid":csv[i]})); //create a 'place' for this product in the list.
					numRequests += myControl.ext.store_prodlist.calls.getProd.init(csv[i],parentID ? {'callback':'translateTemplate','extension':'store_prodlist','parentID':'#'+parentID+"_"+csv[i]} : {});  //tagObj not passed if parentID not set. 
					}

//				myControl.util.dump(' -> # of product in memory/local = '+sum);
				return numRequests;
				}, //getProductDataForList
			
/*
a function similar to getProductDataForList, but this is just for getting data with no intent for immediate use.
I recognize that the getProductDataForList 'could' be used for this, but I wanted another function that was very tight and fast. 
no "if's". nothing but quickly generating requests and adding them to the passive q.
allows for getting the 'next page' worth of data in advance.
*/
			getProductDataForLaterUse : function(csv)	{
				csv = $.grep(csv,function(n){return(n);}); //remove blanks
				var L = csv.length;
				for(var i = 0; i < L; i += 1)	{
					myControl.ext.store_prodlist.calls.getProd.init(csv[i],{},'passive');
					}
				}, //getProductDataForList

/*
will remove all 'undefined' items from csvArray.
will also remove any items that are in the 'forgetme' list in store_prodlist.vars.forgetme
returns the array.  To get a count of how many items were removed, do a .length on the 
array both before and after and subtract the difference.
*/

			filterProdlist : function(csvArray)	{
				var L = csvArray.length;
				for(i = 0; i < L; i +=1)	{
					if(csvArray[i] === 'undefined'){
						myControl.util.dump(" -> Caught an undef! ");
						csvArray.splice(i,1)
						}
					if(myControl.ext.store_prodlist.vars.forgetme[csvArray[i]])	{
						myControl.util.dump(" -> ITEM REMOVED: "+csvArray[i]);
						csvArray.splice(i,1)
						itemsRemoved += 1;
						}
					}
				return csvArray;
				},

/*
Execute this prior to working with a prodlist. saves a variety of vars to the control for reference.
if the csv for a list is manipulated (items permanently removed), reExecute this.

Param Object:
items_per_page = int. The highest number of items to show per page. setting to 20 in a csv of 50 items generates 3 pages.
parentID = ID of div or other html element where list is added to DOM.
page = int (the page in focus. defaults to 1). page 1 = 1. page 2 = 2.
templateID = id of template to be used.
csv = comma separated list of pids. will support a string or an object.
will return false if required params are not passed (templateID and parentID).

the object created here is passed as 'data' into the mulitpage template. that's why the vars are not camelCase, to be more consistent with attributes.

*/

			setProdlistVars : function(paramObj)	{
//				myControl.util.dump("BEGIN myControl.ext.store_prodlist.util.setProdlistVars");
				var r = true;
//without a parent id and a spec, there is no place to put the prodlist and no idea what it should look like.
				if(paramObj.parentID && paramObj.templateID)	{
//					myControl.util.dump(" -> required fields present. and then...");
					myControl.ext.store_prodlist.vars[paramObj.parentID] = typeof myControl.ext.store_prodlist.vars[paramObj.parentID] === 'object' ? myControl.ext.store_prodlist.vars[paramObj.parentID] : {}; //create object if it doesn't already exist.
					var csvArray = new Array();
//setProdlistVars() saves to ...ext.prodlist_store.var[parentid] and this object passed back in.
					if(typeof paramObj.csv === 'undefined')	{
						r = false;
						myControl.util.dump(" -> attempted to make a product list, but no product received.");
						}
					else	{
						if(typeof paramObj.csv === 'object')	{
							csvArray = paramObj.csv;
							}
//may end up with a string passed in of comma separated values. this is what's actually returned from in @products sometimes.
						else if(typeof paramObj.csv === 'string')	{
							csvArray = paramObj.csv.split(',')
							}
						else	{
							r = false;
							myControl.util.dump(" -> unknown data type for csv. csv type = "+typeof csv+" paramObj.csv type = "+typeof paramObj.csv);
							}
						}

					csvArray = $.grep(csvArray,function(n){return(n);}); //removes any blanks.

//					myControl.util.dump(csvArray);
					var L = csvArray.length;
//					myControl.util.dump(" -> setProdlistVars for "+paramObj.parentID+"(L = "+L+")");
					csvArray = myControl.ext.store_prodlist.util.filterProdlist(csvArray);
					var itemsRemoved = L - csvArray.length;

//if there are no product in the list. stop here.
					if(L == 0)	{
						r = false;
						}
//					myControl.util.dump(" -> setProdlistVars.L = "+L);
//					myControl.util.dump(" -> setProdlistVars.r = "+r);
//					myControl.util.dump(csvArray);

					if(r)	{
						
//if items per page is not passed in or not already set in the vars object in memory, default to showing entire list of product.
						var itemsPerPage;
						if(paramObj.items_per_page)	{itemsPerPage = paramObj.items_per_page}
						else if	(myControl.ext.store_prodlist.vars[paramObj.parentID] && myControl.ext.store_prodlist.vars[paramObj.parentID].items_per_page){itemsPerPage = myControl.ext.store_prodlist.vars[paramObj.parentID].items_per_page}
						else {itemsPerPage = L}
						var page = paramObj.page_in_focus ? paramObj.page_in_focus*1 : 1; //page start at 1. really, the only place we want page 1 to be 0 is when generating startpoint. so for sanity's sake, page 1 = 1.
						var startpoint = (page-1)*itemsPerPage; //subtract 1 from page so that we start at the zero point in the array.
						var endpoint = startpoint + itemsPerPage; //last spot in csv for this page.
						endpoint = endpoint > L ? L : endpoint; //endpoint shouldn't be greater than the total number of product
	
						myControl.ext.store_prodlist.vars[paramObj.parentID] = {
							"csv": csvArray, //original 'full' list of skus as an object.
							"templateID": paramObj.templateID,
							"parentID":paramObj.parentID,
							"page_start_point" : startpoint + 1,  //what # in the list of product this 'page' starts on. +1 for customer-facing. (so it doesn't say items 0 - 29).
							"page_end_point" : endpoint, //what # in the csv array this page ends on.
							"page_in_focus" : page, //what page is currently being viewed. defaults to 0 which is page 1.
							"page_product_count" :endpoint - startpoint, //# of items on this page.
							"items_per_page" : itemsPerPage, //would equate to 'size' in old rendering engine. Max number of items to display on a given page before going to multipage.
							"items_on_this_page" : csvArray.slice(startpoint,endpoint).length, //# of items on page in focus. on last page of multipage, may be less that items_per_page
							"items_removed" : itemsRemoved, //# of items removed due to 'forgetme' list.
							"total_product_count" : L, //total # of items in this list.
							"total_page_count" : Math.ceil(L/itemsPerPage) //total # of pages for this list.					
							};
						}
					else	{
						myControl.util.dump(" -> Either an issue with the product data or the list is empty.");
						}
					}
				else{
					myControl.util.dump(" -> Missing some required fields for setProdlistVars");
					r = false;
					}
				return r;
				}, //setProdlistVars


/*
The parem object passed into buildProductList is outlined in the setProdlistVars. 
 -> templateID and parentID are required.
Params 'can' include a csv or the csv can be passed in separately. Either is fine, but a csv is required.
 -> this was necessary for multipage formatting.
*/
			buildProductList : function(paramObj)	{
				var r = 0;
//				myControl.util.dump("BEGIN myControl.ext.store_prodlist.util.buildProductList");
//				myControl.util.dump(paramObj.csv);
				if(myControl.ext.store_prodlist.util.setProdlistVars(paramObj))	{
//					myControl.util.dump(" -> required params present. PL object now in memory. show PL.");
					r = myControl.ext.store_prodlist.util.handleProductList(paramObj.parentID);
					}
				else	{
					$('#'+paramObj.parentID).removeClass('loadingBG');
					}
//				myControl.util.dump(" -> r = "+r);
				return r;
				}, //buildProductList

/*
execute this function to build a product list.
*/

			handleProductList : function(parentID)	{
				var r = 0; //returns the number of requests.
//				myControl.util.dump("BEGIN myControl.ext.store_prodlist.util.handleProductList");
//				myControl.util.dump(" -> parent = "+parentID);
//get a fresh start. clear previous MP controls and product data.
//in theory, in a MP format, we could add the children to a parentID_page_X container and, once rendered, just show/hide as a user moves back and forth. ### would require less dom updating. have to find out if it's better to bloat the dom or update it more often.
				var $parent = $('#'+parentID).empty(); 
				var csvArray = new Array();
				if(myControl.ext.store_prodlist.vars[parentID].items_per_page >= myControl.ext.store_prodlist.vars[parentID].csv.length)	{
//					myControl.util.dump(' -> single page product list');
					csvArray = myControl.ext.store_prodlist.vars[parentID].csv
					}
				else	{
//in a multipage format, just request the pids of the page in focus.
//					myControl.util.dump(' -> multi page product list.');
			
					csvArray = myControl.ext.store_prodlist.vars[parentID].csv.slice(myControl.ext.store_prodlist.vars[parentID].page_start_point - 1,myControl.ext.store_prodlist.vars[parentID].page_end_point); //only a portion of the array is needed because we're in mulitpage format and just loading one page.
					this.showMPControls(parentID);

					}
//now that we have our prodlist, get the product data and add it to the DOM.
				r = myControl.ext.store_prodlist.util.getProductDataForList(csvArray,parentID);
				return r;
				},
			
			mpJumpToPage : function(parentID,page)	{
//				myControl.util.dump("BEGIN myControl.ext.store_prodlist.util.mpJumpToPage");
//				myControl.util.dump(" -> parentID = "+parentID);
//				myControl.util.dump(" -> page = "+page);
//update the object for the PL in question, including what page should be in focus and recomputing the start/end points.
//then re-execute the handleProductList and everything will magically update.
				myControl.ext.store_prodlist.vars[parentID].page_in_focus = page;
				
				myControl.ext.store_prodlist.util.setProdlistVars(myControl.ext.store_prodlist.vars[parentID]);
				if(myControl.ext.store_prodlist.util.handleProductList(parentID)){myControl.model.dispatchThis()}
				},
			
			showMPControls : function(parentID)	{
				var $parent = $('#'+parentID);
				$('#mpControl_'+parentID).empty().remove(); //removes any existing MP header for this list.
//add the mp header BEFORE the parent element. the parent element is most likely an unordered list or a table.
				$parent.before(myControl.renderFunctions.createTemplateInstance('mpControlSpec','mpControl_'+parentID));
				myControl.renderFunctions.translateTemplate(myControl.ext.store_prodlist.vars[parentID],'mpControl_'+parentID);
				$parent.parent().find('.mpControlJumpToPage').click(function(){myControl.ext.store_prodlist.util.mpJumpToPage(parentID,$(this).attr('data-page'))})

$parent.parent().find('.paging').each(function(){
$this = $(this)
if($this.attr('data-role') == 'next')	{
	if(myControl.ext.store_prodlist.vars[parentID].page_in_focus == myControl.ext.store_prodlist.vars[parentID].total_page_count)	{$this.attr('disabled','disabled').addClass('ui-state-disabled')}
	else	{
		$(this).click(function(){myControl.ext.store_prodlist.util.mpJumpToPage(parentID,myControl.ext.store_prodlist.vars[parentID].page_in_focus + 1)})
		}
	}
else if($this.attr('data-role') == 'previous')	{
	if(myControl.ext.store_prodlist.vars[parentID].page_in_focus == 1)	{$this.attr('disabled','disabled').addClass('ui-state-disabled')}
	else	{
		$(this).click(function(){myControl.ext.store_prodlist.util.mpJumpToPage(parentID,myControl.ext.store_prodlist.vars[parentID].page_in_focus - 1)})
		}
	
	}

});



				}
			
			}


		
		} //r object.
	return r;
	}