// --------------------------------------------------------------------------------------------------------------------
// <copyright file="BaseController.cs" company="Sinegovsky Ivan">
//   Sinegovsky Ivan, LLC 2013
// </copyright>
// <summary>
//   Base MVC controlelr
// </summary>
// --------------------------------------------------------------------------------------------------------------------

namespace MvcBaseExtensions.Base
{
    using System.Web.Mvc;

    /// <summary>
    /// Base MVC controlelr
    /// </summary>
    public abstract class BaseController : Controller
    {
        /// <summary>
        /// Return JSON success result
        /// </summary>
        /// <param name="data">data to return</param>
        /// <returns>JSON object</returns>
        public JsonResult Success(object data = null)
        {
            return this.Json(new { success = true, response = data });
        }

        /// <summary>
        /// Return JSON error result
        /// </summary>
        /// <param name="message">error message</param>
        /// <returns>JSON object</returns>
        public JsonResult Error(string message)
        {
            return this.Json(new { success = false, response = message });
        }
    }
}