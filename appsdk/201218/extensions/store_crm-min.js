var store_crm=function(){var r={vars:{},calls:{whereAmI:{init:function(tagObj){var r=0;tagObj=$.isEmptyObject(tagObj)?{}:tagObj;tagObj.datapointer="whereAmI"
if(myControl.model.fetchData('whereAmI')==false){myControl.util.dump(" -> whereAmI is not local. go get her Ray!");r=1;this.dispatch(tagObj);}
else{myControl.util.handleCallback(tagObj);}
return r;},dispatch:function(tagObj){myControl.model.addDispatchToQ({"_cmd":"whereAmI","_tag":tagObj});}},appFAQsAll:{init:function(tagObj){var r=0;tagObj=$.isEmptyObject(tagObj)?{}:tagObj;tagObj.datapointer="appFAQs"
if(myControl.model.fetchData('appFAQs')==false){r=1;this.dispatch(tagObj);}
else{myControl.util.handleCallback(tagObj);}
return r;},dispatch:function(tagObj){myControl.model.addDispatchToQ({"_cmd":"appFAQs","method":"all","_tag":tagObj});}},appSendMessage:{init:function(obj,tagObj){myControl.util.dump("store_crm.calls.appSendMessage");myControl.util.dump(obj);obj.msgtype="feedback"
obj["_cmd"]="appSendMessage";obj['_tag']=tagObj;this.dispatch(obj);return 1;},dispatch:function(obj){myControl.model.addDispatchToQ(obj,'immutable');}},buyerProductLists:{init:function(tagObj){var r=0;tagObj=$.isEmptyObject(tagObj)?{}:tagObj;tagObj.datapointer="buyerProductLists"
if(myControl.model.fetchData(tagObj.datapointer)==false){myControl.util.dump(" -> buyerProductLists is not local. go get her Ray!");r=1;this.dispatch(tagObj);}
else{myControl.util.handleCallback(tagObj);}
return r;},dispatch:function(tagObj){myControl.model.addDispatchToQ({"_cmd":"buyerProductLists","_tag":tagObj});}},buyerProductListDetail:{init:function(listID,tagObj,Q){var r=0;tagObj=$.isEmptyObject(tagObj)?{}:tagObj;tagObj.datapointer="buyerProductListDetail|"+listID
if(myControl.model.fetchData(tagObj.datapointer)==false){myControl.util.dump(" -> buyerProductListDetail is not local. go get her Ray!");r=1;this.dispatch(listID,tagObj,Q);}
else{myControl.util.handleCallback(tagObj);}
return r;},dispatch:function(listID,tagObj,Q){myControl.model.addDispatchToQ({"_cmd":"buyerProductListDetail","listid":listID,"_tag":tagObj},Q);}},buyerProductListAppendTo:{init:function(obj,tagObj){this.dispatch(obj,tagObj);return 1;},dispatch:function(obj,tagObj){obj['_cmd']="buyerProductListAppendTo"
obj['_tag']=tagObj;myControl.model.addDispatchToQ(obj);}},buyerProductListRemoveFrom:{init:function(listID,stid,tagObj){this.dispatch(listID,stid,tagObj);return 1;},dispatch:function(listID,stid,tagObj){myControl.model.addDispatchToQ({"_cmd":"buyerProductListRemoveFrom","listid":listID,"sku":stid,"_tag":tagObj});}},appReviewAdd:{init:function(obj,tagObj){this.dispatch(obj,tagObj);return 1;},dispatch:function(obj,tagObj){obj['_cmd']='appReviewAdd';obj['_tag']=tagObj;myControl.model.addDispatchToQ(obj);}},appBuyerPasswordRecover:{init:function(login,tagObj){this.dispatch(login,tagObj);return 1;},dispatch:function(login,tagObj){var obj={};obj.login=login;obj.method='email';obj['_tag']=tagObj;myControl.model.addDispatchToQ(obj,'immutable');}},buyerNewsletters:{init:function(tagObj,Q){myControl.util.dump("BEGIN store_crm.calls.buyerNewsletters.init");this.dispatch(tagObj,Q);return 1;},dispatch:function(tagObj,Q){obj={};obj['_tag']=tagObj;obj['_cmd']="buyerNewsletters";myControl.model.addDispatchToQ(obj,Q);}},setNewsletters:{init:function(obj,tagObj){myControl.util.dump("BEGIN store_crm.calls.setNewsletters.init");var r=1;this.dispatch(obj,tagObj);return r;},dispatch:function(obj,tagObj){obj['_tag']=tagObj;obj['_cmd']="setNewsletters";myControl.model.addDispatchToQ(obj);}},getNewsletters:{init:function(tagObj){var r=0;tagObj=$.isEmptyObject(tagObj)?{}:tagObj;tagObj.datapointer="getNewsletters"
if(myControl.model.fetchData('getNewsletters')==false){r=1;this.dispatch(tagObj);}
else{myControl.util.handleCallback(tagObj);}
return r;},dispatch:function(tagObj){myControl.model.addDispatchToQ({"_cmd":"getNewsletters","_tag":tagObj});}},buyerPasswordUpdate:{init:function(password,tagObj){myControl.util.dump("BEGIN store_crm.calls.buyerPasswordUpdate.init");this.dispatch(password,tagObj);return 1;},dispatch:function(password,tagObj){var obj={};obj.password=password;obj['_tag']=tagObj;obj['_cmd']="buyerPasswordUpdate";myControl.util.dump(obj);myControl.model.addDispatchToQ(obj,'immutable');}},buyerPurchaseHistory:{init:function(tagObj,Q){var r=1;tagObj=$.isEmptyObject(tagObj)?{}:tagObj;tagObj.datapointer="buyerPurchaseHistory"
this.dispatch(tagObj,Q);return r;},dispatch:function(tagObj,Q){myControl.model.addDispatchToQ({"_cmd":"buyerPurchaseHistory","DETAIL":"5","_zjsid":myControl.sessionId,"_tag":tagObj},Q);}},buyerPurchaseHistoryDetail:{init:function(orderid,tagObj,Q){var r=0;tagObj=$.isEmptyObject(tagObj)?{}:tagObj;tagObj.datapointer="buyerPurchaseHistoryDetail|"+orderid;this.dispatch(orderid,tagObj,Q);r=1;return r;},dispatch:function(orderid,tagObj,Q){tagObj=$.isEmptyObject(tagObj)?{}:tagObj;tagObj.datapointer="buyerPurchaseHistoryDetail|"+orderid
myControl.model.addDispatchToQ({"_cmd":"buyerPurchaseHistoryDetail","orderid":orderid,"_zjsid":myControl.sessionId,"_tag":tagObj},Q);}}},callbacks:{init:{onSuccess:function(){return true;},onError:function(d){myControl.util.dump('BEGIN myControl.ext.store_crm.callbacks.init.onError');}},showFAQTopics:{onSuccess:function(tagObj){myControl.util.dump('BEGIN store_crm.howFAQTopics.onSuccess ');var $parent=$('#'+tagObj.parentID);$parent.removeClass('loadingBG');var L=myControl.data[tagObj.datapointer]['@topics'].length;myControl.util.dump(" -> L = "+L);var topicID;if(L>0){for(i=0;i<L;i+=1){topicID=myControl.data[tagObj.datapointer]['@topics'][i]['TOPIC_ID']
myControl.util.dump(" -> TOPIC ID = "+topicID);$parent.append(myControl.renderFunctions.transmogrify({'id':topicID,'data-topicid':topicID},tagObj.templateID,myControl.data[tagObj.datapointer]['@topics'][i]))}}
else{$parent.append("There are no FAQ at this time.");}},onError:function(responseData,uuid){myControl.util.handleErrors(responseData,uuid)}},showOrderHistory:{onSuccess:function(tagObj){myControl.util.dump('BEGIN myControl.ext.store_crm.showOrderHistory.onSuccess ');var $parent=$('#'+tagObj.parentID);var orderid;var L=myControl.data[tagObj.datapointer]['@orders'].length;if(L>0){for(i=0;i<L;i+=1){orderid=myControl.data[tagObj.datapointer]['@orders'][i].ORDERID;$parent.append(myControl.renderFunctions.createTemplateInstance(tagObj.templateID,"order_"+orderid));myControl.renderFunctions.translateTemplate(myControl.data[tagObj.datapointer]['@orders'][i],"order_"+orderid);}}
else{$parent.empty().removeClass('loadingBG').append("You have not placed an order with us.");}},onError:function(responseData,uuid){myControl.util.handleErrors(responseData,uuid)}},showSubscribeForm:{onSuccess:function(tagObj){var $parent=$('#'+tagObj.parentID);$parent.append(myControl.renderFunctions.createTemplateInstance(tagObj.templateID,"subscribeFormContainer"));myControl.renderFunctions.translateTemplate(myControl.data[tagObj.datapointer],"subscribeFormContainer");},onError:function(responseData,uuid){myControl.util.handleErrors(responseData,uuid)}},showSubscribeSuccess:{onSuccess:function(tagObj){myControl.util.dump('BEGIN myControl.ext.store_crm.showSubscribeForm.onSuccess ');$('#'+tagObj.parentID).empty("thank you!");},onError:function(responseData,uuid){myControl.util.handleErrors(responseData,uuid)}},showOrder:{onSuccess:function(tagObj){myControl.util.dump("BEGIN store_crm.callbacks.showOrder");myControl.util.dump(tagObj);myControl.renderFunctions.translateTemplate(myControl.data[tagObj.datapointer].order,tagObj.parentID);var orderID=tagObj.datapointer.split('|')[1]
myControl.util.dump(" -> order id = "+orderID);var L=myControl.data[tagObj.datapointer].order.stuff.length;var stid,pid;var $parent=$("#orderProductLineitem_"+myControl.util.makeSafeHTMLId(orderID)).removeClass('loadingBG');for(i=0;i<L;i+=1){stid=myControl.data[tagObj.datapointer].order.stuff[i].sku;pid=stid.split(':')[0]
$parent.append(myControl.renderFunctions.createTemplateInstance('orderProductLineItemTemplate',{"id":'order_'+orderID+'_stid_'+stid,"pid":pid,"stid":stid}));myControl.renderFunctions.translateTemplate(myControl.data[tagObj.datapointer].order.stuff[i],'order_'+orderID+'_stid_'+stid);}},onError:function(d){$('#'+d['_rtag'].parentID).empty.append(myControl.util.getResponseErrors(d)).toggle(true);}}},validate:{addReview:function(obj){myControl.util.dump(obj);var errors='';if(!obj.SUBJECT)
errors+='please enter a subject.<br \/>';if(!obj.RATING)
errors+='please enter a rating<br \/>';if(!obj.MESSAGE)
errors+='please enter a review<br \/>';if(errors=='')
return true;else
return errors;},changePassword:function(obj){myControl.util.dump("BEGIN store_crm.validate.subscribe");myControl.util.dump(obj);var valid=true;if(obj.password==''){valid=false}
if(obj.password!=obj.password2){valid=false}
return valid;},subscribe:function(obj){myControl.util.dump("BEGIN store_crm.validate.subscribe");myControl.util.dump(obj);var errors='';if(!obj.login)
errors+='<li>please enter an email address.</li>';else if(!myControl.util.isValidEmail(obj.login))
errors+='<li>please enter a valid email address.</li>';if(obj.fullname&&obj.fullname.indexOf(' ')<0)
errors+='<li>please enter your full name.</li>';if(!errors)
return true;else
return errors;}},renderFormats:{subscribeCheckboxes:function($tag,data){var o="<ul class='subscriberLists'>";for(index in data.bindData.cleanValue){o+="<li title='"+data.bindData.cleanValue[index].EXEC_SUMMARY+"'>";o+="<input type='checkbox' checked='checked' name='newsletter-"+data.bindData.cleanValue[index].ID+"' id='newsletter-"+data.bindData.cleanValue[index].ID+"' \/>";o+="<label for='newsletter-"+data.bindData.cleanValue[index].ID+"'>"+data.bindData.cleanValue[index].NAME+"<\/label><\/li>";}
o+='<\/ul>';$tag.append(o);}},util:{showReviewFrmInModal:function(P){myControl.util.dump("BEGIN store_crm.util.showReviewFrmInModal");if(!P.pid||!P.templateID){myControl.util.dump(" -> pid or template id left blank");}
else{var $parent=$('#review-modal');if($parent.length==0){myControl.util.dump(" -> modal window doesn't exist. create it.");$parent=$("<div \/>").attr({"id":"review-modal",'data-pid':P.pid}).appendTo(document.body);}
else{myControl.util.dump(" -> use existing modal. empty it.");$parent.empty();}
$parent.attr({"title":"Write a review for "+myControl.data['appProductGet|'+P.pid]['%attribs']['zoovy:prod_name']}).append(myControl.renderFunctions.createTemplateInstance(P.templateID,'review-modal_'+P.pid));myControl.renderFunctions.translateTemplate(myControl.data['appProductGet|'+P.pid],'review-modal_'+P.pid);$parent.dialog({modal:true,width:500,height:500});}},handleReviews:function(formID){frmObj=$('#'+formID).serializeJSON();$('#'+formID+' .zMessage').empty().remove();var isValid=myControl.ext.store_crm.validate.addReview(frmObj);if(isValid===true){myControl.ext.store_crm.calls.appReviewAdd.init(frmObj,{"callback":"showMessaging","parentID":formID,"message":"Thank you for your review. Pending approval, it will be added to the store."});myControl.model.dispatchThis();}
else{$('#'+formID).prepend(myControl.util.formatMessage(isValid));}},showSubscribe:function(P){if(!P.targetID&&!P.templateID){myControl.util.dump("for crm_store.util.showSubscribe, both targetID and templateID are required");}
else{if(myControl.ext.store_crm.calls.getNewsletters.init({"parentID":P.parentID,"templateID":P.templateID,"callback":"showSubscribeForm","extension":"store_crm"})){myControl.model.dispatchThis()}}},getSkusFromList:function(listID){myControl.util.dump("BEGIN store_crm.util.getSkusFromList ("+listID+")");var L=myControl.data['buyerProductListDetail|'+listID]['@'+listID].length;var csvArray=new Array();for(i=0;i<L;i+=1){csvArray.push(myControl.data['buyerProductListDetail|'+listID]['@'+listID][i].SKU);}
csvArray=$.grep(csvArray,function(n){return(n);});return csvArray;},handleChangePassword:function(formID,tagObj){$('#'+formID+' .zMessage').empty().remove();var formObj=$('#'+formID).serializeJSON();if(myControl.ext.store_crm.validate.changePassword(formObj)){myControl.ext.store_crm.calls.buyerPasswordUpdate.init(formObj.password,tagObj);myControl.model.dispatchThis('immutable');}
else{$('#'+formID).prepend(myControl.util.formatMessage("The two passwords entered do not match."));}},handleSubscribe:function(formID,tagObj){myControl.util.dump("BEGIN store_crm.util.handleSubscribe");frmObj=$('#'+formID).serializeJSON();$('#'+formID+' .zMessage').empty().remove();var isValid=myControl.ext.store_crm.validate.subscribe(frmObj);if(isValid===true){tagObj=$.isEmptyObject(tagObj)?{}:tagObj;tagObj.callback=tagObj.callback?tagObj.callback:'showMessaging';tagObj.message=tagObj.message?tagObj.message:'Thank you, you have been added to our newsletter.';tagObj.parentID=tagObj.parentID?tagObj.parentID:formID;myControl.ext.store_crm.calls.setNewsletters.init(frmObj,tagObj);myControl.model.dispatchThis();}
else{$('#'+formID).append(myControl.util.formatMessage("<ul>"+isValid+"<\/ul>"));}}}}
return r;}