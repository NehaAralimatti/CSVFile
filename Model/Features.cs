using CSVFileDAL.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CSVFileDAL.Model;

public class Features
{
    public int FeatureID { get; set; }
    public string FeatureName { get; set; }
    public string Value { get; set; }

    public string FeatureDataType { get; set; }

    public DateTime CreatedAt { get; set; }

    public byte ApprovalStatus { get; set; }

    public string AdminComments { get; }
    public int UserID { get; set; }

   // [ForeignKey("EntityTbl")]
    public string EntityName { get; set; }

    public EntityTbl EntityTbl { get; set; }
}
