// This file was generated by Mendix Studio Pro.
//
// WARNING: Code you write here will be lost the next time you deploy the project.

package myfirstmodule.proxies;

public class Book implements com.mendix.systemwideinterfaces.core.IEntityProxy
{
	private final com.mendix.systemwideinterfaces.core.IMendixObject bookMendixObject;

	private final com.mendix.systemwideinterfaces.core.IContext context;

	/**
	 * Internal name of this entity
	 */
	public static final java.lang.String entityName = "MyFirstModule.Book";

	/**
	 * Enum describing members of this entity
	 */
	public enum MemberNames
	{
		Title("Title"),
		Selected("Selected"),
		KeyString("KeyString"),
		KeyInteger("KeyInteger"),
		Group("Group"),
		Book_Collection("MyFirstModule.Book_Collection");

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

	public Book(com.mendix.systemwideinterfaces.core.IContext context)
	{
		this(context, com.mendix.core.Core.instantiate(context, entityName));
	}

	protected Book(com.mendix.systemwideinterfaces.core.IContext context, com.mendix.systemwideinterfaces.core.IMendixObject bookMendixObject)
	{
		if (bookMendixObject == null) {
			throw new java.lang.IllegalArgumentException("The given object cannot be null.");
		}
		if (!com.mendix.core.Core.isSubClassOf(entityName, bookMendixObject.getType())) {
			throw new java.lang.IllegalArgumentException(String.format("The given object is not a %s", entityName));
		}	

		this.bookMendixObject = bookMendixObject;
		this.context = context;
	}

	/**
	 * Initialize a proxy using context (recommended). This context will be used for security checking when the get- and set-methods without context parameters are called.
	 * The get- and set-methods with context parameter should be used when for instance sudo access is necessary (IContext.createSudoClone() can be used to obtain sudo access).
	 * @param context The context to be used
	 * @param mendixObject The Mendix object for the new instance
	 * @return a new instance of this proxy class
	 */
	public static myfirstmodule.proxies.Book initialize(com.mendix.systemwideinterfaces.core.IContext context, com.mendix.systemwideinterfaces.core.IMendixObject mendixObject)
	{
		return new myfirstmodule.proxies.Book(context, mendixObject);
	}

	public static myfirstmodule.proxies.Book load(com.mendix.systemwideinterfaces.core.IContext context, com.mendix.systemwideinterfaces.core.IMendixIdentifier mendixIdentifier) throws com.mendix.core.CoreException
	{
		com.mendix.systemwideinterfaces.core.IMendixObject mendixObject = com.mendix.core.Core.retrieveId(context, mendixIdentifier);
		return myfirstmodule.proxies.Book.initialize(context, mendixObject);
	}

	public static java.util.List<myfirstmodule.proxies.Book> load(com.mendix.systemwideinterfaces.core.IContext context, java.lang.String xpathConstraint) throws com.mendix.core.CoreException
	{
		return com.mendix.core.Core.createXPathQuery(String.format("//%1$s%2$s", entityName, xpathConstraint))
			.execute(context)
			.stream()
			.map(obj -> myfirstmodule.proxies.Book.initialize(context, obj))
			.collect(java.util.stream.Collectors.toList());
	}

	/**
	 * @return value of Title
	 */
	public final java.lang.String getTitle()
	{
		return getTitle(getContext());
	}

	/**
	 * @param context
	 * @return value of Title
	 */
	public final java.lang.String getTitle(com.mendix.systemwideinterfaces.core.IContext context)
	{
		return (java.lang.String) getMendixObject().getValue(context, MemberNames.Title.toString());
	}

	/**
	 * Set value of Title
	 * @param title
	 */
	public final void setTitle(java.lang.String title)
	{
		setTitle(getContext(), title);
	}

	/**
	 * Set value of Title
	 * @param context
	 * @param title
	 */
	public final void setTitle(com.mendix.systemwideinterfaces.core.IContext context, java.lang.String title)
	{
		getMendixObject().setValue(context, MemberNames.Title.toString(), title);
	}

	/**
	 * @return value of Selected
	 */
	public final java.lang.Boolean getSelected()
	{
		return getSelected(getContext());
	}

	/**
	 * @param context
	 * @return value of Selected
	 */
	public final java.lang.Boolean getSelected(com.mendix.systemwideinterfaces.core.IContext context)
	{
		return (java.lang.Boolean) getMendixObject().getValue(context, MemberNames.Selected.toString());
	}

	/**
	 * Set value of Selected
	 * @param selected
	 */
	public final void setSelected(java.lang.Boolean selected)
	{
		setSelected(getContext(), selected);
	}

	/**
	 * Set value of Selected
	 * @param context
	 * @param selected
	 */
	public final void setSelected(com.mendix.systemwideinterfaces.core.IContext context, java.lang.Boolean selected)
	{
		getMendixObject().setValue(context, MemberNames.Selected.toString(), selected);
	}

	/**
	 * @return value of KeyString
	 */
	public final java.lang.String getKeyString()
	{
		return getKeyString(getContext());
	}

	/**
	 * @param context
	 * @return value of KeyString
	 */
	public final java.lang.String getKeyString(com.mendix.systemwideinterfaces.core.IContext context)
	{
		return (java.lang.String) getMendixObject().getValue(context, MemberNames.KeyString.toString());
	}

	/**
	 * Set value of KeyString
	 * @param keystring
	 */
	public final void setKeyString(java.lang.String keystring)
	{
		setKeyString(getContext(), keystring);
	}

	/**
	 * Set value of KeyString
	 * @param context
	 * @param keystring
	 */
	public final void setKeyString(com.mendix.systemwideinterfaces.core.IContext context, java.lang.String keystring)
	{
		getMendixObject().setValue(context, MemberNames.KeyString.toString(), keystring);
	}

	/**
	 * @return value of KeyInteger
	 */
	public final java.lang.Integer getKeyInteger()
	{
		return getKeyInteger(getContext());
	}

	/**
	 * @param context
	 * @return value of KeyInteger
	 */
	public final java.lang.Integer getKeyInteger(com.mendix.systemwideinterfaces.core.IContext context)
	{
		return (java.lang.Integer) getMendixObject().getValue(context, MemberNames.KeyInteger.toString());
	}

	/**
	 * Set value of KeyInteger
	 * @param keyinteger
	 */
	public final void setKeyInteger(java.lang.Integer keyinteger)
	{
		setKeyInteger(getContext(), keyinteger);
	}

	/**
	 * Set value of KeyInteger
	 * @param context
	 * @param keyinteger
	 */
	public final void setKeyInteger(com.mendix.systemwideinterfaces.core.IContext context, java.lang.Integer keyinteger)
	{
		getMendixObject().setValue(context, MemberNames.KeyInteger.toString(), keyinteger);
	}

	/**
	 * @return value of Group
	 */
	public final java.lang.String getGroup()
	{
		return getGroup(getContext());
	}

	/**
	 * @param context
	 * @return value of Group
	 */
	public final java.lang.String getGroup(com.mendix.systemwideinterfaces.core.IContext context)
	{
		return (java.lang.String) getMendixObject().getValue(context, MemberNames.Group.toString());
	}

	/**
	 * Set value of Group
	 * @param group
	 */
	public final void setGroup(java.lang.String group)
	{
		setGroup(getContext(), group);
	}

	/**
	 * Set value of Group
	 * @param context
	 * @param group
	 */
	public final void setGroup(com.mendix.systemwideinterfaces.core.IContext context, java.lang.String group)
	{
		getMendixObject().setValue(context, MemberNames.Group.toString(), group);
	}

	/**
	 * @throws com.mendix.core.CoreException
	 * @return value of Book_Collection
	 */
	public final myfirstmodule.proxies.Collection getBook_Collection() throws com.mendix.core.CoreException
	{
		return getBook_Collection(getContext());
	}

	/**
	 * @param context
	 * @return value of Book_Collection
	 * @throws com.mendix.core.CoreException
	 */
	public final myfirstmodule.proxies.Collection getBook_Collection(com.mendix.systemwideinterfaces.core.IContext context) throws com.mendix.core.CoreException
	{
		myfirstmodule.proxies.Collection result = null;
		com.mendix.systemwideinterfaces.core.IMendixIdentifier identifier = getMendixObject().getValue(context, MemberNames.Book_Collection.toString());
		if (identifier != null) {
			result = myfirstmodule.proxies.Collection.load(context, identifier);
		}
		return result;
	}

	/**
	 * Set value of Book_Collection
	 * @param book_collection
	 */
	public final void setBook_Collection(myfirstmodule.proxies.Collection book_collection)
	{
		setBook_Collection(getContext(), book_collection);
	}

	/**
	 * Set value of Book_Collection
	 * @param context
	 * @param book_collection
	 */
	public final void setBook_Collection(com.mendix.systemwideinterfaces.core.IContext context, myfirstmodule.proxies.Collection book_collection)
	{
		if (book_collection == null) {
			getMendixObject().setValue(context, MemberNames.Book_Collection.toString(), null);
		} else {
			getMendixObject().setValue(context, MemberNames.Book_Collection.toString(), book_collection.getMendixObject().getId());
		}
	}

	@Override
	public final com.mendix.systemwideinterfaces.core.IMendixObject getMendixObject()
	{
		return bookMendixObject;
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
			final myfirstmodule.proxies.Book that = (myfirstmodule.proxies.Book) obj;
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
