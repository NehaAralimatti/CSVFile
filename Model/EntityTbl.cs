using CSVFileDAL.Model;
using System.ComponentModel.DataAnnotations;

namespace CSVFileDAL.Models;

public class EntityTbl
{
    [Key]
    public string EntityName { get; set; }
    public string Description{ get; set; }

    //public string Address {  get; set; }

    //public List<Features> Features { get; set; }
}


