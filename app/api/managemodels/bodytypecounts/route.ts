import { Model } from "@/models";
import { dbConnect } from "@/lib/dbConnect";

export async function GET(req: Request){
    await dbConnect();
    try {
    const { searchParams } = new URL(req.url);
    const brand = searchParams.get('brand'); // optional filter

    const match: any = {};
    if (brand) match.brand = brand;

    // Aggregate to get counts per bodyType
    const bodyTypeCounts = await Model.aggregate([
      { $match: match }, // filter by brand if needed
      {
        $group: {
          _id: "$bodyType", // group by bodyType
          count: { $sum: 1 } // count number of cars
        }
      },
      { $sort: { count: -1 } } // optional: sort by count descending
    ]);

    return new Response(
      JSON.stringify({ success: true, bodyTypeCounts }),
      { status: 200 }
    );

  } catch (error) {
    console.error('Error fetching bodyType counts:', error);
    return new Response(
      JSON.stringify({ success: false, message: 'Server error' }),
      { status: 500 }
    );
  }
}