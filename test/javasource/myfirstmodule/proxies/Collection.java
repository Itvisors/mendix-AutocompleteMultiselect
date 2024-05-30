// This file was generated by Mendix Studio Pro.
//
// WARNING: Code you write here will be lost the next time you deploy the project.

package myfirstmodule.proxies;

public class Collection implements com.mendix.systemwideinterfaces.core.IEntityProxy
{
	private final com.mendix.systemwideinterfaces.core.IMendixObject collectionMendixObject;

	private final com.mendix.systemwideinterfaces.core.IContext context;

	/**
	 * Internal name of this entity
	 */
	public static final java.lang.String entityName = "MyFirstModule.Collection";

	/**
	 * Enum describing members of this entity
	 */
	public enum MemberNames
	{
		Name("Name"),
		Reset("Reset"),
		Response("Response"),
		DefaultString("DefaultString");

		private final java.lang.String metaName;

		MemberNames(java.lang.String s)
		{
			metaName = s;
		}

		@java.lang.Override
		public java.lang.String toString()
		{
			return metaName;
		}
	}

	public Collection(com.mendix.systemwideinterfaces.core.IContext context)
	{
		this(context, com.mendix.core.Core.instantiate(context, entityName));
	}

	protected Collection(com.mendix.systemwideinterfaces.core.IContext context, com.mendix.systemwideinterfaces.core.IMendixObject collectionMendixObject)
	{
		if (collectionMendixObject == null) {
			throw new java.lang.IllegalArgumentException("The given object cannot be null.");
		}
		if (!com.mendix.core.Core.isSubClassOf(entityName, collectionMendixObject.getType())) {
			throw new java.lang.IllegalArgumentException(String.format("The given object is not a %s", entityName));
		}	

		this.collectionMendixObject = collectionMendixObject;
		this.context = context;
	}

	/**
	 * Initialize a proxy using context (recommended). This context will be used for security checking when the get- and set-methods without context parameters are called.
	 * The get- and set-methods with context parameter should be used when for instance sudo access is necessary (IContext.createSudoClone() can be used to obtain sudo access).
	 * @param context The context to be used
	 * @param mendixObject The Mendix object for the new instance
	 * @return a new instance of this proxy class
	 */
	public static myfirstmodule.proxies.Collection initialize(com.mendix.systemwideinterfaces.core.IContext context, com.mendix.systemwideinterfaces.core.IMendixObject mendixObject)
	{
		return new myfirstmodule.proxies.Collection(context, mendixObject);
	}

	public static myfirstmodule.proxies.Collection load(com.mendix.systemwideinterfaces.core.IContext context, com.mendix.systemwideinterfaces.core.IMendixIdentifier mendixIdentifier) throws com.mendix.core.CoreException
	{
		com.mendix.systemwideinterfaces.core.IMendixObject mendixObject = com.mendix.core.Core.retrieveId(context, mendixIdentifier);
		return myfirstmodule.proxies.Collection.initialize(context, mendixObject);
	}

	public static java.util.List<myfirstmodule.proxies.Collection> load(com.mendix.systemwideinterfaces.core.IContext context, java.lang.String xpathConstraint) throws com.mendix.core.CoreException
	{
		return com.mendix.core.Core.createXPathQuery(String.format("//%1$s%2$s", entityName, xpathConstraint))
			.execute(context)
			.stream()
			.map(obj -> myfirstmodule.proxies.Collection.initialize(context, obj))
			.collect(java.util.stream.Collectors.toList());
	}

	/**
	 * @return value of Name
	 */
	public final java.lang.String getName()
	{
		return getName(getContext());
	}

	/**
	 * @param context
	 * @return value of Name
	 */
	public final java.lang.String getName(com.mendix.systemwideinterfaces.core.IContext context)
	{
		return (java.lang.String) getMendixObject().getValue(context, MemberNames.Name.toString());
	}

	/**
	 * Set value of Name
	 * @param name
	 */
	public final void setName(java.lang.String name)
	{
		setName(getContext(), name);
	}

	/**
	 * Set value of Name
	 * @param context
	 * @param name
	 */
	public final void setName(com.mendix.systemwideinterfaces.core.IContext context, java.lang.String name)
	{
		getMendixObject().setValue(context, MemberNames.Name.toString(), name);
	}

	/**
	 * @return value of Reset
	 */
	public final java.lang.Boolean getReset()
	{
		return getReset(getContext());
	}

	/**
	 * @param context
	 * @return value of Reset
	 */
	public final java.lang.Boolean getReset(com.mendix.systemwideinterfaces.core.IContext context)
	{
		return (java.lang.Boolean) getMendixObject().getValue(context, MemberNames.Reset.toString());
	}

	/**
	 * Set value of Reset
	 * @param reset
	 */
	public final void setReset(java.lang.Boolean reset)
	{
		setReset(getContext(), reset);
	}

	/**
	 * Set value of Reset
	 * @param context
	 * @param reset
	 */
	public final void setReset(com.mendix.systemwideinterfaces.core.IContext context, java.lang.Boolean reset)
	{
		getMendixObject().setValue(context, MemberNames.Reset.toString(), reset);
	}

	/**
	 * @return value of Response
	 */
	public final java.lang.String getResponse()
	{
		return getResponse(getContext());
	}

	/**
	 * @param context
	 * @return value of Response
	 */
	public final java.lang.String getResponse(com.mendix.systemwideinterfaces.core.IContext context)
	{
		return (java.lang.String) getMendixObject().getValue(context, MemberNames.Response.toString());
	}

	/**
	 * Set value of Response
	 * @param response
	 */
	public final void setResponse(java.lang.String response)
	{
		setResponse(getContext(), response);
	}

	/**
	 * Set value of Response
	 * @param context
	 * @param response
	 */
	public final void setResponse(com.mendix.systemwideinterfaces.core.IContext context, java.lang.String response)
	{
		getMendixObject().setValue(context, MemberNames.Response.toString(), response);
	}

	/**
	 * @return value of DefaultString
	 */
	public final java.lang.String getDefaultString()
	{
		return getDefaultString(getContext());
	}

	/**
	 * @param context
	 * @return value of DefaultString
	 */
	public final java.lang.String getDefaultString(com.mendix.systemwideinterfaces.core.IContext context)
	{
		return (java.lang.String) getMendixObject().getValue(context, MemberNames.DefaultString.toString());
	}

	/**
	 * Set value of DefaultString
	 * @param defaultstring
	 */
	public final void setDefaultString(java.lang.String defaultstring)
	{
		setDefaultString(getContext(), defaultstring);
	}

	/**
	 * Set value of DefaultString
	 * @param context
	 * @param defaultstring
	 */
	public final void setDefaultString(com.mendix.systemwideinterfaces.core.IContext context, java.lang.String defaultstring)
	{
		getMendixObject().setValue(context, MemberNames.DefaultString.toString(), defaultstring);
	}

	@Override
	public final com.mendix.systemwideinterfaces.core.IMendixObject getMendixObject()
	{
		return collectionMendixObject;
	}

	@Override
	public final com.mendix.systemwideinterfaces.core.IContext getContext()
	{
		return context;
	}

	@java.lang.Override
	public boolean equals(Object obj)
	{
		if (obj == this) {
			return true;
		}
		if (obj != null && getClass().equals(obj.getClass()))
		{
			final myfirstmodule.proxies.Collection that = (myfirstmodule.proxies.Collection) obj;
			return getMendixObject().equals(that.getMendixObject());
		}
		return false;
	}

	@java.lang.Override
	public int hashCode()
	{
		return getMendixObject().hashCode();
	}

  /**
   * Gives full name ("Module.Entity" name) of the type of the entity.
   *
   * @return the name
   */
	public static java.lang.String getType()
	{
		return entityName;
	}
}
