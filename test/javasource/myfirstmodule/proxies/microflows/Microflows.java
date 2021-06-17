// This file was generated by Mendix Studio Pro.
//
// WARNING: Code you write here will be lost the next time you deploy the project.

package myfirstmodule.proxies.microflows;

import java.util.HashMap;
import java.util.Map;
import com.mendix.core.Core;
import com.mendix.core.CoreException;
import com.mendix.systemwideinterfaces.MendixRuntimeException;
import com.mendix.systemwideinterfaces.core.IContext;
import com.mendix.systemwideinterfaces.core.IMendixObject;

public class Microflows
{
	// These are the microflows for the MyFirstModule module
	public static void aCT_Book_Save(IContext context, myfirstmodule.proxies.Book _book)
	{
		Map<java.lang.String, Object> params = new HashMap<>();
		params.put("Book", _book == null ? null : _book.getMendixObject());
		Core.microflowCall("MyFirstModule.ACT_Book_Save").withParams(params).execute(context);
	}
	public static void aCT_Collection_MapIntKey(IContext context, myfirstmodule.proxies.Collection _collection)
	{
		Map<java.lang.String, Object> params = new HashMap<>();
		params.put("Collection", _collection == null ? null : _collection.getMendixObject());
		Core.microflowCall("MyFirstModule.ACT_Collection_MapIntKey").withParams(params).execute(context);
	}
	public static void aCT_Collection_MapStringKey(IContext context, myfirstmodule.proxies.Collection _collection)
	{
		Map<java.lang.String, Object> params = new HashMap<>();
		params.put("Collection", _collection == null ? null : _collection.getMendixObject());
		Core.microflowCall("MyFirstModule.ACT_Collection_MapStringKey").withParams(params).execute(context);
	}
	public static void aCT_Collection_Reset(IContext context, myfirstmodule.proxies.Collection _collection)
	{
		Map<java.lang.String, Object> params = new HashMap<>();
		params.put("Collection", _collection == null ? null : _collection.getMendixObject());
		Core.microflowCall("MyFirstModule.ACT_Collection_Reset").withParams(params).execute(context);
	}
	public static void aCT_Collection_Save(IContext context, myfirstmodule.proxies.Collection _collection)
	{
		Map<java.lang.String, Object> params = new HashMap<>();
		params.put("Collection", _collection == null ? null : _collection.getMendixObject());
		Core.microflowCall("MyFirstModule.ACT_Collection_Save").withParams(params).execute(context);
	}
	public static void aCT_Collection_Save_SingleSelect(IContext context, myfirstmodule.proxies.Collection _collection)
	{
		Map<java.lang.String, Object> params = new HashMap<>();
		params.put("Collection", _collection == null ? null : _collection.getMendixObject());
		Core.microflowCall("MyFirstModule.ACT_Collection_Save_SingleSelect").withParams(params).execute(context);
	}
	public static java.util.List<myfirstmodule.proxies.Book> dS_Collection_GetBooks(IContext context, myfirstmodule.proxies.Collection _collection)
	{
		Map<java.lang.String, Object> params = new HashMap<>();
		params.put("Collection", _collection == null ? null : _collection.getMendixObject());
		java.util.List<IMendixObject> objs = Core.microflowCall("MyFirstModule.DS_Collection_GetBooks").withParams(params).execute(context);
		java.util.List<myfirstmodule.proxies.Book> result = null;
		if (objs != null)
		{
			result = new java.util.ArrayList<>();
			for (IMendixObject obj : objs)
				result.add(myfirstmodule.proxies.Book.initialize(context, obj));
		}
		return result;
	}
	public static void oCH_Collection_Refresh(IContext context, myfirstmodule.proxies.Collection _collection)
	{
		Map<java.lang.String, Object> params = new HashMap<>();
		params.put("Collection", _collection == null ? null : _collection.getMendixObject());
		Core.microflowCall("MyFirstModule.OCH_Collection_Refresh").withParams(params).execute(context);
	}
	public static void oCH_Collection_SetSelectedBooks(IContext context, myfirstmodule.proxies.Collection _collection)
	{
		Map<java.lang.String, Object> params = new HashMap<>();
		params.put("Collection", _collection == null ? null : _collection.getMendixObject());
		Core.microflowCall("MyFirstModule.OCH_Collection_SetSelectedBooks").withParams(params).execute(context);
	}
}